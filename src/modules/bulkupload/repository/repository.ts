import type mongoose from 'mongoose';
import BulkModel from './model';
import { type IBulkData } from '../entities/IBulkData';

class Repository {
    private readonly bulkModel: mongoose.Model<IBulkData>;

    constructor() {
        this.bulkModel = BulkModel;
    }

    public bulkUpload = async (csvData: any): Promise<any> => {
        const result = await this.bulkModel.create(csvData);
        return result;
    };

    public getAll = async (): Promise<any> => {
        const result = await this.bulkModel.find();
        return result;
    };
}

export default new Repository();
