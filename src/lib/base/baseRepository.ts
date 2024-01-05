import {
    type Document,
    type FilterQuery,
    type Model,
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

    public async countRecords(): Promise<any> {
        const result = await this.model.countDocuments();
        return result;
    }

    public async findByField(filter: FilterQuery<T>): Promise<any> {
        const result = await this.model.find(filter);
        return result;
    }
}

export default BaseRepository;
