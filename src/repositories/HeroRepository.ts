import mongoose, { Document, Model } from "mongoose";
class HeroRepository<T extends Document> {
  private model: mongoose.Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  insertRecords = async (data: T) => {
    try {
      await this.model.insertMany(data);
      console.log("Data Inserted Successfully!");
    } catch (error) {
      console.error("Data not Inserted:", error);
    }
  };

  findRecords = async () => {
    try {
      return await this.model.find();
    } catch (error) {
      console.log("Error Occured: ", error);
    }
  };
}

export default HeroRepository;
