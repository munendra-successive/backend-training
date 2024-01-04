import { type CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';
import { type IEvent, type IAddress } from '../entities';

const addressSchema: Schema = new Schema<IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const EventSchema: Schema = new Schema<IEvent>(
    {
        name: { type: String, required: true },
        address: { type: addressSchema, required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        category: { type: String, required: true },
        organizerInfo: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true },
);

// Pre-save hook to ensure startDate is before endDate
EventSchema.pre<IEvent>(
    'save',
    function startDate(next: CallbackWithoutResultAndOptionalError) {
        if (this.startDate > this.endDate) {
            next(new Error('Start date must be before the end date.'));
        } else {
            next();
        }
    },
);

// Pre-save hook to ensure endDate is after startDate
EventSchema.pre<IEvent>(
    'save',
    function endDate(next: CallbackWithoutResultAndOptionalError) {
        if (this.endDate < this.startDate) {
            next(new Error('End date must be after the start date.'));
        } else {
            next();
        }
    },
);

export default EventSchema;
