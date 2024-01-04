import type mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from '.';
import { type IUser, type IQueryName } from '../entities';
import { BaseRepository } from '../../../lib/index';

class Repository extends BaseRepository<IUser> {
    private readonly userModel: mongoose.Model<IUser>;

    constructor() {
        super(UserModel);
        this.userModel = UserModel;
    }

    public async deleteByName(name: IQueryName): Promise<any> {
        const result = await this.userModel.deleteOne(name);
        return result;
    }

    public async register(regData: IUser): Promise<any> {
        const existUser: IUser | null = await this.userModel.findOne({
            email: regData.email,
        });
        if (!existUser) {
            const hashPassword: string = await bcrypt.hash(regData.password, 10);
            const newUser: any = {
                ...regData,
                password: hashPassword,
            };
            const result = await this.userModel.create(newUser);
            return result;
        }
        return { message: 'User already exist' };
    }
}
export default new Repository();
