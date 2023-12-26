import { Schema } from "mongoose";
import { type IBulkData } from "../entities/IBulkData";

const BulkSchema: Schema = new Schema<IBulkData>(
  {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    noOfItems: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default BulkSchema;
