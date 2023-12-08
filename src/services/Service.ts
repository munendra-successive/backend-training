import ICountry from "../repositories/interface/ICountry";
import { CountryModel } from "../models/CountriesSchema";
import IUser from "../repositories/interface/IUser";
import UserModel from "../models/UsersSchema";
import HeroRepository from "../repositories/HeroRepository";

class Service {
  login() {
      throw new Error("Method not implemented.");
  }
  private countryRepoInstance: HeroRepository<ICountry>;
  private userRepoInstance: HeroRepository<IUser>;
  constructor() {
    this.userRepoInstance = new HeroRepository<IUser>(UserModel);
    this.countryRepoInstance = new HeroRepository<ICountry>(CountryModel);
  }

  async addCountries(countriesData: ICountry) {
    try {
      this.countryRepoInstance.insertRecords(countriesData);
      return await this.countryRepoInstance.findRecords();
    } catch (error) {
      console.error("Error seeding countries:", error);
    }
  }
  async addUser(userData: IUser) {
    try {
      this.userRepoInstance.insertRecords(userData);
      return await this.userRepoInstance.findRecords();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Service();
