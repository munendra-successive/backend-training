import mongoose, { Schema, Model } from "mongoose";
import ICountry from "../repositories/interface/ICountry";

const CountrySchema = new Schema<ICountry>({
  CountryName: { type: String, required: true },
  PlayersName: [{ type: String, required: true }],
});

const CountryModel: Model<ICountry> = mongoose.model<ICountry>(
  "Country",
  CountrySchema
);

export { CountryModel };
