import fs from 'fs';
import csvParser from 'csv-parser';
import { type IEvent, type IQueryStatus } from './entities';
import { Repository } from './repository';
import BulkModel from '../bulkupload/repository/model';

class Service {
    static async getAll(): Promise<any> {
        const result = await Repository.get();
        return result;
    }

    static async add(eventData: IEvent): Promise<void> {
        await Repository.insert(eventData);
    }

    static async getLimit(limit: number, skip: number): Promise<any> {
        const result = await Repository.getLimit(limit, skip);
        return result;
    }

    static async findByType(type: string): Promise<any> {
        const filter: { type: string } = { type };
        const result = await Repository.findByField(filter);
        return result;
    }

    static async findByStatus(status: string): Promise<any> {
        const filter: { status: string } = { status };
        const result = await Repository.findByField(filter);
        return result;
    }

    static async deleteByStatus(status: string): Promise<any> {
        const query: IQueryStatus = { status };
        const result = await Repository.deleteByStatus(query);
        return result;
    }

    static async updateByStatus(
        oldStatus: string,
        newStatus: string,
    ): Promise<any> {
        const filter: { status: string } = { status: oldStatus };
        const update: { $set: { status: string } } = {
            $set: { status: newStatus },
        };
        const result = await Repository.updateRecords(filter, update);
        return result;
    }

    static async count(): Promise<any> {
        const result = await Repository.countRecords();
        return result;
    }

    static async deleteAll(): Promise<void> {
        await Repository.deleteAll();
    }

    static async findById(_id: string): Promise<any> {
        const filter: { _id: string } = { _id };
        const result = await Repository.findByField(filter);
        return result;
    }

    static async UpdateById(eventId: string, dataToUpdate: IEvent): Promise<any> {
        const result = await Repository.UpdateById(eventId, dataToUpdate);
        return result;
    }

    static async deleteById(eventId: string): Promise<any> {
        const result = await Repository.deleteById(eventId);
        return result;
    }

    static async uploadCsv(fileInfo: {
    fileName: string;
    filePath: string;
  }): Promise<void> {
        const { fileName, filePath } = fileInfo;

        const dataToInsert: any[] = [];
        const startTime: string = new Date().toLocaleString();

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
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
            .on('end', async () => {
                try {
                    // Save the data to MongoDB using Repository.uploadCsv method
                    const result: any = await Repository.uploadCsv(dataToInsert);
                    // Remove the uploaded CSV file after processing
                    fs.unlinkSync(filePath);

                    const endTime: string = new Date().toLocaleString();

                    // Create an entry in BulkModel (if this model exists) or handle accordingly
                    await BulkModel.create({
                        startTime,
                        endTime,
                        noOfItemsToBeInserted: dataToInsert.length,
                        successfulInserted: result.length,
                        failedDuringInsert: dataToInsert.length - result.length,
                        fileName,
                    });
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error('Error processing CSV:', error);
                }
            });
    }
}
export default Service;
