import {
    type Document,
    type FilterQuery,
    type Model,
    type UpdateQuery,
} from 'mongoose';
import type mongoose from 'mongoose';

class BaseRepository<T extends Document> {
    private readonly model: mongoose.Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    public async insert(data: T): Promise<any> {
        const result = await this.model.insertMany(data);
        return result;
    }

    public async get(): Promise<any> {
        const result = await this.model.find();
        return result;
    }

    public async countRecords(): Promise<any> {
        const result = await this.model.countDocuments();
        return result;
    }

    public async findByField(filter: FilterQuery<T>): Promise<any> {
        const result = await this.model.find(filter);
        return result;
    }

    public async deleteAll(): Promise<any> {
        const result = await this.model.deleteMany();
        return result;
    }

    public async updateRecords(
        filter: FilterQuery<T>,
        update: UpdateQuery<T>,
    ): Promise<any> {
        const result = await this.model.updateMany(filter, update);
        return result;
    }
}

export default BaseRepository;
