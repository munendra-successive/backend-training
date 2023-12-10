import mongoose from "mongoose";

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

  
}

export default new Connection();
