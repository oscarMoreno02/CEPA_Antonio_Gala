const request = require('supertest');
const express = require('express');
const routes = require('../routes/eventoRoutes')
const auth = require('../routes/authRoutes')

const app = express();
app.use(express.json());
const appAuth = express();
appAuth.use(express.json());

app.use('/', routes);
appAuth.use('/', auth);
describe('Test de rutas del router', () => {
    it('Obtener todos los eventos', async () => {
      const response = await request(app).get('/obtener')
      expect(response.status).toBe(200)
    })
  
    it('Obtener el evento 1', async () => {
      const response = await request(app).get('/obtener/1')
      expect(response.status).toBe(200)
    })
  
    it('Eliminar el evento 1', async () => {
      const response = await request(app).delete('/1');
      expect(response.status).toBe(200)
    })
  
    it('Aumentar los mg del evento 1', async () => {
      const response = await request(app).put('/mg/1')
      expect(response.status).toBe(200)
    })
  
    it('Obtener el número de asistentes del evento 1', async () => {
      const response = await request(app).get('/numAsistentes/1')
      expect(response.status).toBe(200)
    })

    it('Eliminar una plaza del evento 1', async () => {
      const response = await request(app).put('/eliminarPlaza/1')
      expect(response.status).toBe(200)
    })
  
    it('Añadir una plaza al evento 1', async () => {
      const response = await request(app).put('/anadirPlaza/1')
      expect(response.status).toBe(200)
    })
  })