import mongoose from "mongoose";
import { CountryModel } from "../models/CountriesSchema.js";
import countriesData from "./seedData.js";

class Connection {
  private URI = "mongodb://127.0.0.1:27017/Countries";

  connectDb = async () => {
    try {
      await mongoose.connect(this.URI);
      console.log("Connection successful");
    } catch (error) {
      console.log(error);
      console.error("Database Connection Failed");
      process.exit(0);
    }
  };

  async seedCountries() {
    try {
      await CountryModel.insertMany(countriesData);
      console.log("Countries seeded successfully!");
    } catch (error) {
      console.error("Error seeding countries:", error);
    } finally {
      mongoose.disconnect();
    }
  }
}

export default new Connection();
