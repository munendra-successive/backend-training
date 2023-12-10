import mongoose, { Model } from "mongoose";
import { IEvent } from "../entities";
import { EventSchema } from "./index.js";

const EventModel: Model<IEvent> = mongoose.model<IEvent>("events", EventSchema);

export { EventModel };
