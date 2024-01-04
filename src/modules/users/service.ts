import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Repository } from './repository';
import { type ILogin, type IUser, type IQueryName } from './entities';

class Service {
    static generateToken(loginData: ILogin): string {
        const token: string = jwt.sign(loginData, 'myNameIsMunendraKumarKushwaha', {
            expiresIn: '30m',
        });
        return token;
    }

    static async login(loginData: ILogin): Promise<any> {
        const { email, password } = loginData;
        const filter: { email: string } = { email };
        const user: any = await Repository.findByField(filter);

        if (user) {
            const result = await bcrypt.compare(password, user[0].password);
            return result;
        }
        return false;
    }

    static async register(regData: IUser): Promise<any> {
        const result = await Repository.register(regData);
        return result;
    }

    static updateByName = async (
        oldName: string,
        newName: string,
    ): Promise<any> => {
        const filter: {
      name: string;
    } = { name: oldName };
        const update: {
      $set: {
        name: string;
      };
    } = { $set: { name: newName } };
        const result = await Repository.updateRecords(filter, update);
        return result;
    };

    static findByName = async (name: string): Promise<any> => {
        const filter: {
      name: string;
    } = { name };
        return Repository.findByField(filter);
    };

    static deleteByName = async (name: string): Promise<any> => {
        const query: IQueryName = { name };
        return Repository.deleteByName(query);
    };
}
export default Service;
