import type express from "express";
import csvParser from "csv-parser";
import fs from "fs";
import { BulkModel } from "./repository/model";
import { EventModel } from "../events/repository";

class Controller {
  uploadCsv = (req: express.Request, res: express.Response): any => {
    try {
      console.log("In Controller");

      const filePath: string | undefined = req.file?.path;
      console.log(filePath);

      if (!filePath) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      console.log(filePath);

      const dataToInsert: any[] = [];
      const startTime: string = new Date().toLocaleString();
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          // Process each row of the CSV and construct the data to be inserted
          // Customize this part according to your CSV columns and schema
          dataToInsert.push({
            name: row.name,
            address: {
              street: row.street,
              city: row.city,
              state: row.state,
              postalCode: row.postalCode,
              country: row.country,
            },
            description: row.description,
            startDate: row.startDate,
            endDate: row.endDate,
            category: row.category,
            organizerInfo: row.organizerInfo,
            type: row.type,
            status: row.status,
          });
        })
        .on("end", async () => {
          // Save the data to MongoDB
          await EventModel.insertMany(dataToInsert, { ordered: false });

          // Remove the uploaded CSV file after processing
          fs.unlinkSync(filePath);

          const endTime: string = new Date().toLocaleString();
          await BulkModel.create({
            startTime,
            endTime,
            noOfItems: dataToInsert.length,
          });

          return res.status(200).json({
            message: "CSV data uploaded and saved to MongoDB successfully",
            numberOfItems: dataToInsert.length,
          });
        });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default new Controller();
