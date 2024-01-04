import Repository from './repository/repository';

class Service {
    static bulkUpload = async (csvData: any): Promise<any> => {
        const result = await Repository.bulkUpload(csvData);
        return result;
    };

    static getAll = async (): Promise<any> => {
        const result = await Repository.getAll();
        return result;
    };
}

export default Service;
