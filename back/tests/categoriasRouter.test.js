const request = require('supertest');
const express = require('express');
const routes = require('../routes/categoriasRoutes')
const auth = require('../routes/authRoutes')

const app = express();
app.use(express.json());
const appAuth = express();
appAuth.use(express.json());

app.use('/', routes);
appAuth.use('/', auth);

describe('Testeo de rutas GET', () => {
    let nueva = {
        nombre: "{categoria test}",
        dependiente: null
    }
    let id = 0

    it('Inserccion con token no válido', async () => {
        const response = await request(app).post('/').send(nueva).set('x-token','aaaaa');
        expect(response.statusCode).toBe(401);
    });

    //Este usuario es exclusivo de la bbdd de test.
    // Lo he introducido manualmente para evitar que quede publicado
    //un usuario con acceso administrador

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

    it('Registro con el token valido', async () => {
        const response = await request(app).post('/').send(nueva).set('x-token',token);
        expect(response.statusCode).toBe(201);
        id=response.body.id
        nueva.id= id
    });
    
    
    it('Comprobación de registro en bbdd', async () => {
        const response = await request(app).get('/' + id);
        expect(response.statusCode).toBe(200);
        expect(response.body.nombre).toBe(nueva.nombre);
    });


    it('Actualización de nombre ', async () => {
        nueva.nombre= "{categoria test cambiado}"
        const response = await request(app).put('/'+id).send(nueva).set('x-token',token);
        expect(response.statusCode).toBe(202);
        
    });
 
    it('Establecer categoria dependiente a si misma ', async () => {
        nueva.dependiente=id
       
        const response = await request(app).put('/'+id).send(nueva).set('x-token',token);
        expect(response.statusCode).toBe(400);
        expect(response.body).toBe('No se puede asignar una dependencia a la misma categoria')
        nueva.dependiente=null
    });
    it('Insercción de categoria con el mismo nombre', async () => {
        const response = await request(app).post('/').send(nueva).set('x-token',token);
        expect(response.body.errors[0].msg).toBe('Nombre en uso');
        expect(response.statusCode).toBe(400)
    });
    it('Eliminación categoria sin token valido', async () => {
        const response = await request(app).delete('/'+ id).send(nueva).set('x-token','aaa');
        expect(response.statusCode).toBe(401)
    });
    it('Eliminación categoria con token', async () => {
        const response = await request(app).delete('/'+ id).send(nueva).set('x-token',token);
        expect(response.statusCode).toBe(202)
    });
});
