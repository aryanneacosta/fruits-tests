import supertest from "supertest";
import app from "../src/index";

const api = supertest(app);

describe('GET /fruits', () => {
    it('Response status 200', async () => {
        const result = await api.get('/fruits');
        expect(result.status).toBe(200);
    });
});

describe('GET /fruits/:id', () => {
    beforeAll(async () => {
        await api.post('/fruits').send({
            name: 'banana',
            price: 5
        });
    });

    it('Response status 200 if valid id', async () => {
        const result = await api.get('/fruits/1');
        expect(result.status).toBe(200);
    });

    it('Response status 404 if invalid id', async () => {
        const result = await api.get('/fruits/2');
        expect(result.status).toBe(404);
    });
});

describe('POST /fruits', () => {
    
    it('Response status 201 if post succeed', async () => {
        const result = await api.post('/fruits').send({
            name: 'maçã',
            price: 4
        });
        expect(result.status).toBe(201);
    });

    it('Response status 409 if post repeated fruit', async () => {
        const result = await api.post('/fruits').send({
            name: 'maçã',
            price: 4
        });
        expect(result.status).toBe(409);
    });
});