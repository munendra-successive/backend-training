import { type Response, type Request } from 'express';
import { Service } from '.';
import { type ILogin, type IUser } from './entities';

export default class Controller {
    static login = async (req: Request, res: Response): Promise<any> => {
        try {
            const loginData: ILogin = req.body;
            const isAuthenticated: any = await Service.login(loginData);
            if (isAuthenticated) {
                const token: string = Service.generateToken(loginData);
                return res
                    .status(200)
                    .json({ message: 'Login Successful', tokenIs: token });
            }
            return res.status(200).json({ message: 'Invalid credentials' });
        } catch (error) {
            return res.status(400).json({ 'Error Occured': error });
        }
    };

    static register = async (req: Request, res: Response): Promise<any> => {
        try {
            const registerData: IUser = req.body;
            const response: any = await Service.register(registerData);
            if (response.message) return res.status(200).json({ message: 'User already exist' });
            return res.status(200).json({ message: 'Registered Successfully' });
        } catch (error) {
            return res.status(400).json({ 'Error Occured': error });
        }
    };

    static findByName = async (req: Request, res: Response): Promise<any> => {
        try {
            const { name } = req.params;
            const user: any = await Service.findByName(name);
            if (user.length !== 0) {
                return res.status(200).json({ 'Data is': user });
            }
            return res.status(400).json({ message: 'No user found' });
        } catch (error) {
            return res.status(500).json({ 'Error Occured': error });
        }
    };

    static deleteByName = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name } = req.params;
            const user: any = await Service.findByName(name);
            if (user.length !== 0) {
                const response: any = await Service.deleteByName(name);
                if (response) res.status(200).json({ message: 'user deleted' });
            } else {
                res.status(400).json({ message: 'No user exist' });
            }
        } catch (error) {
            res.status(400).json({ 'Error Occured': error });
        }
    };

    static updateByName = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name1, name2 } = req.query;
            const uname1: string = typeof name1 === 'string' ? name1 : '';
            const uname2: string = typeof name2 === 'string' ? name2 : '';

            const user: any = await Service.findByName(uname1);
            if (user.length !== 0) {
                const isUpdated: any = await Service.updateByName(uname1, uname2);
                if (isUpdated) res.status(200).json({ message: 'user updated' });
            } else {
                res.status(400).json({ message: 'No user exist' });
            }
        } catch (error) {
            res.status(400).json({ 'Error Occured': error });
        }
    };
}
