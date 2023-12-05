import mongoose, { Document, Schema, Model } from "mongoose";

interface ICountry extends Document {
  CountryName: string;
  PlayersName: string[];
}

const CountrySchema = new Schema<ICountry>({
  CountryName: { type: String, required: true },
  PlayersName: [{ type: String, required: true }],
});

const CountryModel: Model<ICountry> = mongoose.model<ICountry>(
  "Country",
  CountrySchema
);

export { ICountry, CountryModel };
