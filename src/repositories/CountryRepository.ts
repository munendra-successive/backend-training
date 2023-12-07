import ICountry from "./interface/ICountry";
import mongoose from "mongoose";
import { CountryModel } from "../models/CountriesSchema";
import BaseRepository from "./base/BaseRepository";

class CountryRepository extends BaseRepository<ICountry> {
  private CountryModel: mongoose.Model<ICountry>;
  constructor() {
    super(CountryModel);
    this.CountryModel = CountryModel;
  }

  insertAll = async (data: ICountry) => {
    await this.insertRecords(data);
  };

  findAll = async () => {
    return await this.findRecords();
  };

  findByCountryName = async () => {
    return await this.CountryModel.findOne({ CountryName: "India" });
  };

  UpdateByCountryName = async () => {
    await this.UpdateRecords(
      { CountryName: "India" },
      { $set: { CountryName: "Nepal" } }
    );
  };

  deleteByCountryName = async () => {
    await this.CountryModel.deleteMany({ CountryName: "USA" });
  };
}

export default new CountryRepository();
