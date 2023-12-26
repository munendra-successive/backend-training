import {
  type Document,
  type FilterQuery,
  type Model,
  type UpdateQuery,
} from "mongoose";
import type mongoose from "mongoose";

class BaseRepository<T extends Document> {
  private readonly model: mongoose.Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  public async insert(data: T): Promise<any> {
    await this.model.insertMany(data);
  }

  public async get(): Promise<any> {
    return await this.model.find();
  }

  public async countRecords(): Promise<any> {
    return await this.model.countDocuments();
  }

  public async findByField(filter: FilterQuery<T>): Promise<any> {
    return await this.model.find(filter);
  }

  public async deleteAll(): Promise<any> {
    await this.model.deleteMany();
  }

  public async updateRecords(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<any> {
    return await this.model.updateMany(filter, update);
  }
}

export default BaseRepository;
