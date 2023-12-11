import { ICountry } from "./interface";
import mongoose from "mongoose";
import { CountryModel } from "../models";
import BaseRepository from "./base/BaseRepository";

class CountryRepository extends BaseRepository<ICountry> {
  private CountryModel: mongoose.Model<ICountry>;
  constructor() {
    super(CountryModel);
    this.CountryModel = CountryModel;
  }

  findByCountryName = async () => {
    return await this.CountryModel.findOne({ CountryName: "India" });
  };

  deleteByCountryName = async () => {
    return await this.CountryModel.deleteMany({ CountryName: "USA" });
  };
}

export default new CountryRepository();
