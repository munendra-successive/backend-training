import { BulkModel } from "./model";
import { type IBulkData } from "../entities/IBulkData";
import type mongoose from "mongoose";

class Repository {
  private readonly bulkModel: mongoose.Model<IBulkData>;

  constructor() {
    this.bulkModel = BulkModel;
  }

  public bulkUpload = async (csvData: any): Promise<any> => {
    return await this.bulkModel.create(csvData);
  };
}

export default new Repository();
