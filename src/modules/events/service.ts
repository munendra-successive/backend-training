import fs from 'fs';
import csvParser from 'csv-parser';
import { type IEvent } from './entities';
import { Repository } from './repository';
import BulkModel from './repositoryBulk/model';
import JoiSchema from './joiSchema';
import BulkErrorModel from './repositoryBulk/modelError';

class Service {
    static getByUploadId = async (uploadId: string): Promise<any> => {
        const result = await Repository.getByUploadId(uploadId);
        return result;
    };

    static getAll = async (): Promise<any> => {
        const result = await Repository.getAll();
        return result;
    };

    // static async add(eventData: IEvent): Promise<any> {
    // // eslint-disable-nextline no-return-await
    //     return await Repository.insert(eventData);
    // }

    static async getLimit(limit: number, skip: number): Promise<any> {
        const result = await Repository.getLimit(limit, skip);
        return result;
    }

    static async findByType(type: string): Promise<any> {
        const filter: { type: string } = { type };
        const result = await Repository.findByField(filter);
        return result;
    }

    static async count(): Promise<any> {
        const result = await Repository.countRecords();
        return result;
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
        const validData: any[] = [];
        const invalidData: any[] = [];
        const startTime: string = new Date().toLocaleString();
        const uploadId = new Date().getTime().toString();

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
                    dataToInsert.forEach((item, index) => {
                        const { error } = JoiSchema.bulkUpload().validate(item, {
                            abortEarly: false,
                        });
                        if (!error) {
                            validData.push(item);
                        } else {
                            invalidData.push({
                                rowNumber: index + 1,
                                uploadId,
                                errorMessage: error?.details.map((items) => items.message),
                            });
                        }
                    });
                    const result: any = await Repository.uploadCsv(validData);

                    // Remove the uploaded CSV file after processing
                    fs.unlinkSync(filePath);

                    await BulkErrorModel.insertMany(invalidData);

                    const endTime: string = new Date().toLocaleString();

                    // Create an entry in BulkModel (if this model exists) or handle accordingly
                    await BulkModel.create({
                        uploadId,
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
