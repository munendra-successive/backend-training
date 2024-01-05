import express, { type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { Connection as ConnectionInstance } from './lib';
import { router as userRouter } from './modules/users';
import { router as eventRouter } from './modules/events';
import swaggerSpec from './docs/swaggerConfig';

import OtherMiddlewareInstance from './middlewares';

import { serverConfig } from './config';

class Server {
    public readonly app: express.Application;

    constructor() {
        dotenv.config();
        this.app = express();
    }

    async bootstrap(): Promise<void> {
        await this.configure();
        this.routes();
    }

    async configure(): Promise<void> {
        await ConnectionInstance.connectDb();
        dotenv.config();
        this.app.use(express.json());
        this.app.use(
            cors({
                origin: 'http://localhost:3000',
                methods: 'GET,POST,PUT,PATCH,DELETE',
                allowedHeaders: 'Content-Type',
                optionsSuccessStatus: 200,
            }),
        );
        this.app.use(OtherMiddlewareInstance.Logger);
        this.app.use(OtherMiddlewareInstance.addCustomHeader);
    }

    routes(): void {
        this.app.use('/users', userRouter);
        this.app.use('/events', eventRouter);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.app.use('/health-check', (res: Response) => {
            res.send('Health is ok').status(200);
        });

        this.app.use('*', (req, res) => {
            res.status(404).send('URL not found');
        });
    }

    public start(): void {
        // eslint-disable-nextline no-console
        this.app.listen(serverConfig.PORT, () => {
            console.log(`listening on port: ${serverConfig.PORT}`);
        });
    }
}
export default Server;
