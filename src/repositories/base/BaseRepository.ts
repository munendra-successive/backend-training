import mongoose, { Document, FilterQuery, Model, UpdateQuery } from "mongoose";

class BaseRepository<T extends Document> {
  private model: mongoose.Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  insertRecords = async (data: T) => {
    return await this.model.insertMany(data);
  };

  findRecords = async () => {
    return await this.model.find();
  };

  countRecords = async () => {
    return await this.model.countDocuments();
  };

  DeleteAllRecords = async () => {
    return await this.model.deleteMany();
  };

  UpdateRecords = async (filter: FilterQuery<T>, update: UpdateQuery<T>) => {
    return await this.model.updateMany(filter, update);
  };
}

export default BaseRepository;
