import mongoose, { Document, Model } from "mongoose";

class BaseRepository<T extends Document> {
  private model: mongoose.Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  insertRecords = async (data: T) => {
    try {
      await this.model.insertMany(data);
      console.log("Data Inserted Successfully!");
    } catch (error) {
      console.error("Data not Inserted:", error);
    }
  };

  findRecords = async () => {
    try {
      return await this.model.find();
    } catch (error) {
      console.log("Error Occured: ", error);
    }
  };

  countRecords = async () => {
    try {
      return await this.model.countDocuments();
    } catch (error) {
      console.log(error);
    }
  };

  DeleteAllRecords = async () => {
    try {
      await this.model.deleteMany();
    } catch (error) {
      console.log(error);
    }
  };

  UpdateRecords = async (dataNew: object, dataOld: object) => {
    try {
      await this.model.updateMany(dataNew, dataOld);
      console.log("Updated Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
}

export default BaseRepository;
