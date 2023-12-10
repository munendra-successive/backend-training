import { IEvent, IQueryStatus } from "./entities";
import { Repository } from "./repository";

class Service {
  public static async getAll() {
    return await Repository.get();
  }

  public static async add(eventData: IEvent) {
    return await Repository.insert(eventData);
  }

  public static async getLimit(limit: number, skip: number) {
    return await Repository.getLimit(limit, skip);
  }

  public static async findByType(type: string) {
    const filter = { type: type };
    return await Repository.findByField(filter);
  }

  public static async findByStatus(status: string) {
    const filter = { status: status };
    return await Repository.findByField(filter);
  }

  public static async deleteByStatus(status: string) {
    const query: IQueryStatus = { status };
    return await Repository.deleteByStatus(query);
  }

  public static async updateByStatus(oldStatus: string, newStatus: string) {
    const filter = { status: oldStatus };
    const update = { $set: { status: newStatus } };
    return await Repository.updateRecords(filter, update);
  }

  public static async count() {
    return await Repository.countRecords();
  }

  public static async deleteAll() {
    return await Repository.deleteAll();
  }
}

export default Service;
