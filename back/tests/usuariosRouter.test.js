//Raul

const request = require('supertest');
const express = require('express');
const routes = require('../routes/usuarioRutas');
const auth = require('../routes/authRoutes')
const app = express();
app.use(express.json());
const appAuth = express();
appAuth.use(express.json());
app.use('/', routes);
appAuth.use('/',auth)
describe('Testeo de rutas GET', () => {
    let nuevoUsuario = {
        nombre: "Usuario Test",
        email: "test1@usuario.com",
        password: "1234"
    }
    let id = 0;
    let user={
        email:'test@admin.com',
        password:'1234'
      }
      let token=''
      it('Login para obtener el token', async () => {
          const response = await request(appAuth).put('/login').send(user);
          expect(response.statusCode).toBe(200);
          token=response.body.token
      });
    it('Inserccion sin token', async () => {
        const response = await request(app).post('/').send(nuevoUsuario);
        expect(response.statusCode).toBe(201);
    });
    

    it('Actualización de nombre', async () => {
        nuevoUsuario.nombre = "Nuevo Nombre Test";
        const response = await request(app).put('/' + id).send(nuevoUsuario).set('x-token', token);
        expect(response.statusCode).toBe(203);
    });
});
