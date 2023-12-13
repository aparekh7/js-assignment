const request = require('supertest');
const { app } = require('../../index');

describe('News Tests', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });

    // GET Request Tests
    it('should return a 200 OK status code for GET request to /news with matchId param', async () => {
        const query = {'matchId': 2};
        const response = await request(server).get('/news').query(query);
        expect(response.status).toBe(200);
        expect(response.body[0].matchId).toBe(2);
    });

    it('should return a 200 OK status code for GET request to /news with tourId param', async () => {
        const query = {'tourId': 2};
        const response = await request(server).get('/news').query(query);
        expect(response.status).toBe(200);
        expect(response.body[0].tourId).toBe(2);
    });

    it('should return a 200 OK status code for GET request to /news with sportId param', async () => {
        const query = {'sportId': 2};
        const response = await request(server).get('/news').query(query);
        expect(response.status).toBe(200);
        expect(response.body[0].sportId).toBe(2);
    });

    it('should return a 400 Bad Request status code for GET request to /news with no query param', async () => {
        const response = await request(server).get('/news');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('One of matchId, tourId or sportId required');
    });

    it('should return a 404 Not Found status code for GET request to /news if no results are found', async () => {
        const query = {'sportId': -1};
        const response = await request(server).get('/news').query(query);
        expect(response.status).toBe(404);
    });

    // POST Request Tests
    it('should return a 201 Created status code for POST request to /news with matchId in request', async () => {
        requestBody = {
            "title": "title",
            "description": "desc",
            "matchId": 1
        };
        const response = await request(server).post('/news').send(requestBody);
        expect(response.status).toBe(201);
    });

    it('should return a 400 Bad Request status code for POST request to /news for invalid matchId', async () => {
        requestBody = {
            "title": "title",
            "description": "desc",
            "matchId": 100
        };
        const response = await request(server).post('/news').send(requestBody);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Match not found');
    });

    it('should return a 201 Created status code for POST request to /news with tourId in request', async () => {
        requestBody = {
            "title": "title",
            "description": "desc",
            "tourId": 2
        };
        const response = await request(server).post('/news').send(requestBody);
        expect(response.status).toBe(201);
    });

    it('should return a 400 Bad Request status code for POST request to /news for invalid tourId', async () => {
        requestBody = {
            "title": "title",
            "description": "desc",
            "tourId": 100
        };
        const response = await request(server).post('/news').send(requestBody);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Tour not found');
    });

    it('should return a 201 Created status code for POST request to /news with both matchId and tourId in request', async () => {
        requestBody = {
            "title": "title",
            "description": "desc",
            "matchId": 1,
            "tourId": 1
        };
        const response = await request(server).post('/news').send(requestBody);
        expect(response.status).toBe(201);
    });

    it('should return a 400 Bad Request status code for POST request to /news for invalid matchId', async () => {
        requestBody = {
            "title": "title",
            "description": "desc",
            "matchId": 100,
            "tourId": 10
        };
        const response = await request(server).post('/news').send(requestBody);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Match not found');
    });

    it('should return a 400 Bad Request status code for POST request to /news for matchId not belonging to tourId', async () => {
        requestBody = {
            "title": "title",
            "description": "desc",
            "matchId": 1,
            "tourId": 10
        };
        const response = await request(server).post('/news').send(requestBody);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Match does not belong to the Tour');
    });

    it('should return a 400 Bad Request status code for POST request to /news for missing matchId and tourId', async () => {
        requestBody = {
            "title": "title",
            "description": "desc",
        };

        const response = await request(server).post('/news').send(requestBody);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Missing required parameter: matchId or tourId should be present');
    });
  });
