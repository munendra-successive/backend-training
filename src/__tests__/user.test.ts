import request from 'supertest';
import App from '../app';
import { Connection } from '../lib';

const appInstance: App = new App();
const { app } = appInstance;
export default app;

beforeAll(async () => {
    await Connection.connectDb();
    await appInstance.bootstrap();
    appInstance.start();
});

describe('POST /users/login', () => {
    it('should return status 200 and authenticate user', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({ email: 'monu@gmail.com', password: 'MOnu@123' });
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
    });

    it('should return status 400 for unauthenticate user', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({ email: 'abc@gmail.com', password: 'abc@123' });
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('POST /users/register', () => {
    it('should return status 200 and a message - registered successfully', async () => {
        const time = new Date().getTime().toString();
        const res = await request(app)
            .post('/users/register')
            .send({
                name: 'monu',
                email: `monkumaru${time}@gmail.com`,
                password: 'MOnu@123',
                address: 'Delhi, India',
                phone: '7678467864',
            });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Registered Successfully' });
    });

    it('should return status 200 and a message - user already registered', async () => {
        const res = await request(app).post('/users/register').send({
            name: 'monu',
            email: 'monu@gmail.com',
            password: 'MOnu@123',
            address: 'Delhi, India',
            phone: '7678467864',
        });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'User already exist' });
    });
});
