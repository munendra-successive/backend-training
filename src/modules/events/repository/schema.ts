import { Schema } from "mongoose";
import ILocation from "../entities/ILocation";
import IEvent from "../entities/IEvent";

export const LocationSchema = new Schema<ILocation>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const EventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  description: { type: String, required: true },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (this: IEvent, value: Date) {
        // Check if startDate is before endDate
        return value < this.get("endDate");
      },
      message: "Start date must be before the end date.",
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (this: IEvent, value: Date) {
        // Check if endDate is after startDate
        return value > this.get("startDate");
      },
      message: "End date must be after the start date.",
    },
  },
  category: { type: String, required: true },
  oragnizerInfo: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
});

export default EventSchema;
