import mongoose, { Document, FilterQuery, Model, UpdateQuery } from "mongoose";

class BaseRepository<T extends Document> {
  private model: mongoose.Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  public async insert(data: T) {
    await this.model.insertMany(data);
  }

  public async get() {
    return await this.model.find();
  }

  public async countRecords() {
    return await this.model.countDocuments();
  }

  public async findByField(filter: FilterQuery<T>) {
    return await this.model.find(filter);
  }

  public async deleteAll() {
    await this.model.deleteMany();
  }

  public async updateRecords(filter: FilterQuery<T>, update: UpdateQuery<T>) {
    return await this.model.updateMany(filter, update);
  }
}

export default BaseRepository;
