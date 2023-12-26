import { type IEvent, type IQueryStatus } from "./entities";
import { Repository } from "./repository";

class Service {
  public async getAll(): Promise<any> {
    return await Repository.get();
  }

  public async add(eventData: IEvent): Promise<void> {
    await Repository.insert(eventData);
  }

  public async getLimit(limit: number, skip: number): Promise<any> {
    return await Repository.getLimit(limit, skip);
  }

  public async findByType(type: string): Promise<any> {
    const filter: { type: string } = { type };
    return await Repository.findByField(filter);
  }

  public async findByStatus(status: string): Promise<any> {
    const filter: { status: string } = { status };
    return await Repository.findByField(filter);
  }

  public async deleteByStatus(status: string): Promise<any> {
    const query: IQueryStatus = { status };
    return await Repository.deleteByStatus(query);
  }

  public async updateByStatus(
    oldStatus: string,
    newStatus: string,
  ): Promise<any> {
    const filter: { status: string } = { status: oldStatus };
    const update: { $set: { status: string } } = {
      $set: { status: newStatus },
    };
    return await Repository.updateRecords(filter, update);
  }

  public async count(): Promise<any> {
    return await Repository.countRecords();
  }

  public async deleteAll(): Promise<any> {
    await Repository.deleteAll();
  }

  public async findById(_id: string): Promise<any> {
    const filter: { _id: string } = { _id };
    return await Repository.findByField(filter);
  }
}

export default new Service();
