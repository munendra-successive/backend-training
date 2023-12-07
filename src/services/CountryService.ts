import ICountry from "../repositories/interface/ICountry";
import CountryRepoInstance from "../repositories/CountryRepository";

class CountryService {
  async addCountries(countriesData: ICountry) {
    try {
      CountryRepoInstance.insertAll(countriesData);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      return await CountryRepoInstance.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteByCountry() {
    try {
      await CountryRepoInstance.deleteByCountryName();
    } catch (error) {
      console.log(error);
    }
  }

  async updateByCountry() {
    try {
      await CountryRepoInstance.UpdateByCountryName();
    } catch (error) {
      console.log(error);
    }
  }

  async findCountry() {
    try {
      const condata = await CountryRepoInstance.findByCountryName();
      console.log(condata);
    } catch (error) {
      console.log("Error is in findCountry", error);
    }
  }
}

export default new CountryService();
