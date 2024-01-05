import type mongoose from 'mongoose';
import type IEvent from '../entities/IEvent';
import EventModel from './model';
import BaseRepository from '../../../lib/base/baseRepository';
import BulkModel from '../repositoryBulk/model';
import BulkErrorModel from '../repositoryBulk/modelError';

class Repository extends BaseRepository<IEvent> {
    private readonly eventModel: mongoose.Model<IEvent>;

    constructor() {
        super(EventModel);
        this.eventModel = EventModel;
    }

    static async getByUploadId(uploadId: string) {
        const result = await BulkErrorModel.find({ uploadId });
        return result;
    }

    static async getAll(): Promise<any> {
        const result = await BulkModel.find();
        return result;
    }

    async getLimit(limit: number, skip: number): Promise<any> {
        const result = await this.eventModel.find().limit(limit).skip(skip);
        return result;
    }

    async UpdateById(eventId: string, dataToUpdate: IEvent): Promise<any> {
        const result = await this.eventModel.findByIdAndUpdate(
            eventId,
            dataToUpdate,
            {
                new: true,
            },
        );
        return result;
    }

    async deleteById(eventId: string): Promise<any> {
        const result = await this.eventModel.deleteOne({ _id: eventId });
        return result;
    }

    async uploadCsv(data: any): Promise<any> {
        const result = await this.eventModel.insertMany(data, { ordered: false });
        return result;
    }
}

export default new Repository();
