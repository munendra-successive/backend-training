import { ICountry } from "../repositories/interface";
import { CountryRepoInstance } from "../repositories";
class CountryService {
  async addCountries(countriesData: ICountry) {
    return await CountryRepoInstance.insertRecords(countriesData);
  }

  async getAll() {
    return await CountryRepoInstance.findRecords();
  }

  async deleteByCountry() {
    return await CountryRepoInstance.deleteByCountryName();
  }

  async updateByCountry() {
    const filter = { CountryName: "India" };
    const update = { $set: { CountryName: "Nepal" } };
    return await CountryRepoInstance.UpdateRecords(filter, update);
  }

  async findCountry() {
    return await CountryRepoInstance.findByCountryName();
  }
}

export default new CountryService();
