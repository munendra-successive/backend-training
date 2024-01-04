import request from 'supertest';
import App from '../app';
import { Connection } from '../lib';

const appInstance: App = new App();
const { app } = appInstance;

beforeEach(async () => {
    await Connection.connectDb();
    await appInstance.bootstrap();
    appInstance.start();
});

describe('GET /users/find/', () => {
    test('should return users', async () => {
        const res = await request(app).get('/users/find/monu');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
    });
});
