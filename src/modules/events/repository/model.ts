import mongoose, { Model } from "mongoose";
import IEvent from "../entities/IEvent";
import EventSchema from "./schema";

const EventModel: Model<IEvent> = mongoose.model<IEvent>("events", EventSchema);

export { EventModel };
