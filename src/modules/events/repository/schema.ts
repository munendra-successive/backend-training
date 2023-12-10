import { Schema } from "mongoose";
import { IEvent, ILocation } from "../entities";

const locationSchema = new Schema<ILocation>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const EventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  location: { type: locationSchema, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  category: { type: String, required: true },
  organizerInfo: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: String, required: true },
});

// Pre-save hook to ensure startDate is before endDate
EventSchema.pre<IEvent>("save", function (next) {
  if (this.startDate > this.endDate) {
    next(new Error("Start date must be before the end date."));
  } else {
    next();
  }
});

// Pre-save hook to ensure endDate is after startDate
EventSchema.pre<IEvent>("save", function (next) {
  if (this.endDate < this.startDate) {
    next(new Error("End date must be after the start date."));
  } else {
    next();
  }
});

export default EventSchema;
