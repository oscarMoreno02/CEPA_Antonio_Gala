//Raul

const request = require('supertest');
const express = require('express');
const routes = require('../routes/ususarioRutas');

const app = express();
app.use(express.json());

app.use('/', routes);

describe('Testeo de rutas GET', () => {
    let nuevoUsuario = {
        nombre: "Usuario Test",
        email: "test@usuario.com",
        password: "1234"
    }
    let id = 0;

    it('Inserccion sin token', async () => {
        const response = await request(app).post('/').send(nuevoUsuario);
        expect(response.statusCode).toBe(401);
    });

    it('Actualización de nombre', async () => {
        nuevoUsuario.nombre = "Nuevo Nombre Test";
        const response = await request(app).put('/' + id).send(nuevoUsuario).set('x-token', token);
        expect(response.statusCode).toBe(202);
    });
});
