import { type Response, type Request } from 'express';
import { Service } from './index';
import { type IEvent } from './entities';

class Controller {
    static getAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const data: any = await Service.getAll();
            return res.status(200).json({ 'Data is:': data });
        } catch (error) {
            return res.status(400).json({ 'Error Occurred': error });
        }
    };

    static add = async (req: Request, res: Response): Promise<any> => {
        try {
            const eventData: IEvent = req.body;
            await Service.add(eventData);
            return res.status(200).json({ msg: 'Event added Successfully' });
        } catch (error) {
            return res.status(400).json({ 'Error Occurred': error });
        }
    };

    static getLimit = async (req: Request, res: Response): Promise<any> => {
        try {
            const { current, pageSize } = req.query;

            const limit: number = parseInt(pageSize as string, 10);
            const skip: number = parseInt(current as string, 10) * parseInt(pageSize as string, 10);
            const data: any = await Service.getLimit(limit, skip);
            const datalength: number = await Service.count();
            return res.status(200).json({ datalength, 'Data is': data });
        } catch (error) {
            return res.status(400).json({ 'Error Occured': error });
        }
    };

    static getByType = async (req: Request, res: Response): Promise<any> => {
        try {
            const { type } = req.params;
            const event: any = await Service.findByType(type);
            if (event.length !== 0) {
                return res.status(200).json({ 'Data is': event });
            }
            return res.status(400).json({ message: 'No event found' });
        } catch (error) {
            return res.status(400).json({ 'Error Occured': error });
        }
    };

    static deleteByStatus = async (req: Request, res: Response): Promise<any> => {
        try {
            const { status } = req.params;
            const event: any = await Service.findByStatus(status);
            if (event.length !== 0) {
                const response: any = await Service.deleteByStatus(status);
                if (response) res.status(200).json({ message: 'event deleted' });
            } else {
                res.status(400).json({ message: 'No event exist' });
            }
        } catch (error) {
            res.status(400).json({ 'Error Occured': error });
        }
    };

    static updateStatus = async (req: Request, res: Response): Promise<any> => {
        try {
            const { status1, status2 } = req.query;
            const ustatus1: string = typeof status1 === 'string' ? status1 : '';
            const ustatus2: string = typeof status2 === 'string' ? status2 : '';

            const event: any = await Service.findByStatus(ustatus1);
            if (event.length !== 0) {
                const isUpdated: boolean = await Service.updateByStatus(
                    ustatus1,
                    ustatus2,
                );
                if (isUpdated) res.status(200).json({ message: 'status updated' });
            } else {
                res.status(400).json({ message: 'No event exist' });
            }
        } catch (error) {
            res.status(400).json({ 'Error Occured': error });
        }
    };

    static countEvents = async (req: Request, res: Response): Promise<any> => {
        try {
            const data: any = await Service.count();
            res.status(200).json({ 'No of Documents is:': data });
        } catch (error) {
            res.status(400).json({ 'Error Occurred': error });
        }
    };

    static deleteAll = async (req: Request, res: Response): Promise<any> => {
        try {
            await Service.deleteAll();
            return res.status(200).json({ 'Message:': 'Documents Deleted' });
        } catch (error) {
            return res.status(400).json({ 'Error Occurred': error });
        }
    };

    static getById = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;

            const event: any = await Service.findById(id);
            if (event.length !== 0) {
                return res.status(200).json({ 'Data is': event });
            }
            return res.status(400).json({ message: 'No event found' });
        } catch (error) {
            return res.status(400).json({ 'Error Occured': error });
        }
    };

    static updateById = async (req: Request, res: Response): Promise<any> => {
        const eventId: string = req.params.id;
        const dataToUpdate: IEvent = req.body;
        try {
            const updatedEvent: any = await Service.UpdateById(eventId, dataToUpdate);
            res.json({ success: true, data: updatedEvent });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating event',
            });
        }
    };

    static deleteById = async (req: Request, res: Response): Promise<any> => {
        const eventId: string = req.params.id;
        try {
            const response: any = await Service.deleteById(eventId);
            res.status(200).json({ response });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting event',
            });
        }
    };

    static uploadCsv = async (req: Request, res: Response): Promise<any> => {
        try {
            const fileName: any = req.file?.originalname;
            const filePath: string | undefined = req.file?.path;
            if (!filePath) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            await Service.uploadCsv({ fileName, filePath });
            return res.status(200).json({
                message: 'CSV data uploaded and saved to MongoDB successfully',
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}

export default Controller;
