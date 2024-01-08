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

    async getByUploadId(uploadId: string) {
        return await BulkErrorModel.find({ uploadId });
    }

    async getAll(): Promise<any> {
        return await BulkModel.find();
    }

    async getLimit(limit: number, skip: number): Promise<any> {
        return await this.eventModel.find().limit(limit).skip(skip);
    }

    async UpdateById(eventId: string, dataToUpdate: IEvent): Promise<any> {
        return await this.eventModel.findByIdAndUpdate(eventId, dataToUpdate, {
            new: true,
        });
    }

    async deleteById(eventId: string): Promise<any> {
        return await this.eventModel.deleteOne({ _id: eventId });
    }

    async uploadCsv(data: any): Promise<any> {
        return await this.eventModel.insertMany(data, { ordered: false });
    }
}

export default new Repository();
