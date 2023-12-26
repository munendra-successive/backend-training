import Repository from "./repository/repository";
class Service {
  public bulkUpload = async (csvData: any): Promise<any> => {
    return await Repository.bulkUpload(csvData);
  };
}

export default new Service();
