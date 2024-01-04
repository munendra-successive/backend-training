import { type Date, type Document } from 'mongoose';

export interface IBulkData extends Document {
  startTime: Date;
  endTime: Date;
  noOfItemsToBeInserted: number;
  fileName: string;
  successfulInserted: number;
  failedDuringInsert: number;
}
