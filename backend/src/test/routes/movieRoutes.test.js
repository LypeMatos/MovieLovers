import app from '../../app.js';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Movie from '../../Models/MovieModel.js';
import jwt from 'jsonwebtoken';

let server;
let mongoServer;
let movie;
let accessToken;
let token

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    const port = 3000;
    server = app.listen(port);

    movie = await Movie.create({
        _id: "tt0068646",
        title: "The Godfather",
        year: "1972",
        image: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX128_CR0,12,128,176_AL_.jpg",
        rating: 0,
        likes: 1
    })
})

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
})

describe('Teste das rotas de Movie', () => {
    it('Deve retornar uma lista com todos os filmes', async () => {
        const response = await request(app).get('/movies');

        expect(response.status).toBe(200);
    })

    it('Deve retornar o filme pelo seu Id', async () => {
        const response = await request(app).get(`/movie/${movie._id}`);

        expect(response.status).toBe(200);
    })

    it('Deve dar um like no filme escolhido', async () => {
        const response = await request(app).patch(`/movie/${movie._id}/like`).set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
    })
})