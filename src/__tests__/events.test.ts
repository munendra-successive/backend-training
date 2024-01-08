import request from 'supertest';
import app from './user.test';
import { Connection } from '../lib';

describe('POST /events/create', () => {
    it('should return status 200 if event added successfully', async () => {
        const res = await request(app)
            .post('/events/create')
            .send({
                name: 'Munendra Kushwaha',
                address: {
                    street: 'Madison Square Garden',
                    city: 'New York',
                    state: 'New York',
                    postalCode: '10001',
                    country: 'USA',
                },
                description: 'An event in noida',
                startDate: '2023-12-15',
                endDate: '2023-12-16',
                category: 'Music',
                organizerInfo: 'Live Nation',
                type: 'Concert',
                status: 'Limited tickets available',
            });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ msg: 'Event added Successfully' });
    });
    it('should return status 500 if internal server error', async () => {
        await Connection.disconnectDb();
        const res = await request(app)
            .post('/events/create')
            .send({
                name: 'Munendra Kushwaha',
                address: {
                    street: 'Madison Square Garden',
                    city: 'New York',
                    state: 'New York',
                    postalCode: '10001',
                    country: 'USA',
                },
                description: 'An event in noida',
                startDate: '2023-12-15',
                endDate: '2023-12-16',
                category: 'Music',
                organizerInfo: 'Live Nation',
                type: 'Concert',
                status: 'Limited tickets available',
            });
        expect(res.status).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('GET /events/get', () => {
    it('should return status 200 and data', async () => {
        const res = await request(app)
            .get('/events/get')
            .query({ current: '0', pageSize: '10' }); // Assuming parameters to fetch first 10 records

        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('datalength');
        expect(res.body).toHaveProperty('data');
    });

    it('should return status 500', async () => {
        await Connection.disconnectDb();
        const res = await request(app)
            .get('/events/get')
            .query({ current: '0', pageSize: '10' }); // Assuming parameters to fetch first 10 records

        expect(res.status).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('GET /events/getall', () => {
    it('should return status 200 and data', async () => {
        const res = await request(app).get('/events/getall');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('data');
    });
    it('should return status 500 ', async () => {
        await Connection.disconnectDb();
        const res = await request(app).get('/events/getall');
        expect(res.status).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('GET /events/find/:type', () => {
    it('should return status 200 and data', async () => {
        const res = await request(app).get('/events/find/Game');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('data');
    });

    it('should return status 404 if not found', async () => {
        const res = await request(app).get('/events/find/Gamefr');
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message');
    });
    it('should return status 500 ', async () => {
        await Connection.disconnectDb();
        const res = await request(app).get('/events/find/Game');
        expect(res.status).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('GET /events/getById/:id', () => {
    it('should return status 200 and data', async () => {
        const res = await request(app).get(
            '/events/getById/658978c8b133a70e0017396e',
        );
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('data');
    });

    it('should return status 404 if not found', async () => {
        const res = await request(app).get('/events/find/658978c8b133a70e001739');
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message');
    });

    it('should return status 500', async () => {
        await Connection.disconnectDb();
        const res = await request(app).get('/events/find/658978c8b133a70e001739');
        expect(res.status).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('PUT /events/updateById/:id', () => {
    it('should return status 200 and data', async () => {
        const res = await request(app)
            .put('/events/updateById/658978c8b133a70e00173970')
            .send({
                name: 'Munendra Kushwaha',
                address: {
                    street: 'Madison Square Garden',
                    city: 'New York',
                    state: 'New York',
                    postalCode: '10001',
                    country: 'USA',
                },
                description: 'An event in noida',
                startDate: '2023-12-15',
                endDate: '2023-12-15',
                category: 'Music',
                organizerInfo: 'Live Nation',
                type: 'Concert',
                status: 'Limited tickets available',
            });
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('data');
    });

    it('should return status 500', async () => {
        Connection.disconnectDb();
        const res = await request(app)
            .put('/events/updateById/658978c8b133a70e00173970')
            .send({
                name: 'Munendra Kushwaha',
                address: {
                    street: 'Madison Square Garden',
                    city: 'New York',
                    state: 'New York',
                    postalCode: '10001',
                    country: 'USA',
                },
                description: 'An event in noida',
                startDate: '2023-12-15',
                endDate: '2023-12-15',
                category: 'Music',
                organizerInfo: 'Live Nation',
                type: 'Concert',
                status: 'Limited tickets available',
            });
        expect(res.status).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('GET /events/deleteById/:id', () => {
    it('should return status 200 and data', async () => {
        const res = await request(app).delete(
            '/events/deleteById/658978c8b133a70e0017397a',
        );
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('response');
    });
    it('should return status 500', async () => {
        Connection.disconnectDb();
        const res = await request(app).delete(
            '/events/deleteById/658978c8b133a70e0017397a',
        );
        expect(res.status).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('GET /events/getByUploadId/:uploadId', () => {
    it('should return status 200 and data', async () => {
        const res = await request(app).get('/events/getByUploadId/1704394132190');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('data');
    });
    it('should return status 500', async () => {
        Connection.disconnectDb();
        const res = await request(app).get('/events/getByUploadId/1704394132190');
        expect(res.status).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
    });
});

describe('POST /upload/csv', () => {
    it('should return status 200 and success message when a CSV file is uploaded', async () => {
        const res = await request(app)
            .post('/events/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('csvFile', '../../event_me.csv');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: 'CSV data uploaded and saved to MongoDB successfully',
        });
    });
});
