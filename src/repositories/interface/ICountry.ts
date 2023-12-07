import { Document } from "mongoose";

export default interface ICountry extends Document {
  CountryName: string;
  PlayersName: string[];
}
