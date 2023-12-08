import IEvent from "./entities/IEvent";
import Repository from "./repository/repository";

class Service {
  public static async addEvent(eventData: IEvent) {
    try {
      const response = await Repository.addEvent(eventData);
      if (response) {
        console.log("Data Added Successfully");
      }
    } catch (error) {
      console.log("Error Occured in service", error);
    }
  }
}

export default Service;
