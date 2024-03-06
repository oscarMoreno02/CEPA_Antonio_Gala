# CEPA_Antonio_Gala

### Integrantes
- [Jaime Ortega Núñez](https://github.com/jornu99)
- [Laura María Pedraza Gómez](https://github.com/lmexe18)
- [Óscar Moreno](https://github.com/oscarMoreno02)
- [Raúl Gutiérrez Merino](https://github.com/pinoxx64)

## -----------------------------------------------------

## - Base URL: `http://localhost:9090/api`

## -----------------------------------------------------

### Aulas especiales

#### Obtener todas las aulas 

- Verbo: `GET`
- URL: `/aulas/`
- Descripción: Retorna todas las aulas disponibles.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "nombre": "string",
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener aula por id

- Verbo: `GET`
- URL: `/aulas/{int}`
- Descripción: Retorna el aula buscando por id.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "nombre": "string",
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener aula con sus datos

- Verbo: `GET`
- URL: `/aulas/{int}`
- Descripción: Retorna el aula con sus datos.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "nombre": "string",
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Insertar una nueva aula

- Verbo: `POST`
- URL: `/aulas/`
- Descripción: Insertar una nueva asistencia.
- ``Ejemplo de solicitud``:
    ```
        {
            "nombre": "string"
        }
    ```

#### Actualizar un aula

- Verbo: `PUT`
- URL: `/aulas/{int}`
- Descripción: Actualizar un aula existente.
- ``Ejemplo de solicitud``:
    ```
        {
            "nombre": "string"
        }
    ```

#### Eliminar un aula

- Método: `DELETE`
- URL: `/aulas/{int}`
- Descripción: Elimina un aula existente según su ID.

## -----------------------------------------------------

### Franjas 

#### Obtener todas las franjas 

- Verbo: `GET`
- URL: `/franjas/`
- Descripción: Retorna todas las franjas disponibles.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "turno": "string",
            "horaInicio": date,
            "horaFin": date,
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener franja por id

- Verbo: `GET`
- URL: `/franjas/{int}`
- Descripción: Retorna la franja buscando por id.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "turno": "string",
            "horaInicio": date,
            "horaFin": date
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Insertar una nueva franja

- Verbo: `POST`
- URL: `/franjas/`
- Descripción: Insertar una nueva franja.
- ``Ejemplo de solicitud``:
    ```
        {
            "turno": "string",
            "horaInicio": date,
            "horaFin": date
        }
    ```

#### Actualizar una franja

- Verbo: `PUT`
- URL: `/franjas/{int}`
- Descripción: Actualizar una franja existente.
- ``Ejemplo de solicitud``:
    ```
        {
            "turno": "string",
            "horaInicio": date,
            "horaFin": date
        }
    ```

#### Ordenar las franjas

- Verbo: `PUT`
- URL: `/franjas/sort`
- Descripción: Recibe un array de las franjas y mediante un drag & drop se pueden ordenar.

#### Eliminar una franja

- Método: `DELETE`
- URL: `/franjas/{int}`
- Descripción: Elimina una franja existente según su ID.

## -----------------------------------------------------

### Horarios 

#### Obtener todos los horarios 

- Verbo: `GET`
- URL: `/horarios/`
- Descripción: Retorna todos los horarios disponibles.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "idAula": int,
            "idFranja": int,
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener horario por id

- Verbo: `GET`
- URL: `/horarios/{int}`
- Descripción: Retorna el horario buscando por id.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "idAula": int,
            "idFranja": int,
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener horarios de un aula

- Verbo: `GET`
- URL: `/horarios/aula/{int}`
- Descripción: Retorna los horarios de un aula.

#### Obtener reservas de un aula en un día, mes y año

- Verbo: `GET`
- URL: `/horarios/aula/{int}/reservas/DD{int}/MM{int}/YYYY{int}`
- Descripción: Retorna las reservas de un aula en un día.

#### Insertar un nuevo horario

- Verbo: `POST`
- URL: `/horarios/`
- Descripción: Insertar un nuevo horario.
- ``Ejemplo de solicitud``:
    ```
        {
            "idAula": int,
            "idFranja": int
        }
    ```

#### Actualizar un horario

- Verbo: `PUT`
- URL: `/horarios/{int}`
- Descripción: Actualizar un horario existente.
- ``Ejemplo de solicitud``:
    ```
        {
            "idAula": int,
            "idFranja": int
        }
    ```

#### Eliminar un horario

- Método: `DELETE`
- URL: `/horarios/{int}`
- Descripción: Elimina un horario existente según su ID.

## -----------------------------------------------------

### Reservas 

#### Obtener todas las reservas

- Verbo: `GET`
- URL: `/reservas/`
- Descripción: Retorna todas las reservas disponibles.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "idAula": int,
            "idHorario": int,
            "idProfesor": int,
            "fecha": date,
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener reserva por id

- Verbo: `GET`
- URL: `/reservas/{int}`
- Descripción: Retorna la reserva buscando por id.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "idAula": int,
            "idHorario": int,
            "idProfesor": int,
            "fecha": date,
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener reservas de un aula

- Verbo: `GET`
- URL: `/reservas/aula/{int}`
- Descripción: Retorna las reservas de un aula.

#### Obtener reservas de un profesor

- Verbo: `GET`
- URL: `/reservas/profesor/{int}`
- Descripción: Retorna las reservas de un profesor.

#### Obtener reservas con datos

- Verbo: `GET`
- URL: `/reservas/data/`
- Descripción: Retorna las reservas con datos.

#### Insertar una nueva reserva

- Verbo: `POST`
- URL: `/reservas/`
- Descripción: Insertar una nueva reserva.
- ``Ejemplo de solicitud``:
    ```
        {
            "idAula": int,
            "idHorario": int,
            "idProfesor": int,
            "fecha": date,
        }
    ```

#### Actualizar una reserva

- Verbo: `PUT`
- URL: `/reservas/{int}`
- Descripción: Actualizar una reserva existente.
- ``Ejemplo de solicitud``:
    ```
        {
            "idAula": int,
            "idHorario": int,
            "idProfesor": int,
            "fecha": date,
        }
    ```

#### Eliminar una reserva

- Método: `DELETE`
- URL: `/reservas/{int}`
- Descripción: Elimina una reserva existente según su ID.

## -----------------------------------------------------

### Asistencia

#### Obtener todas las asistencias

- Verbo: `GET`
- URL: `/asistencia/`
- Descripción: Retorna todas las asistencias disponibles.
- ``Ejemplo de respuesta``:
    ```
        {
            "idEvento": int,
            "idUsuario: int
        }
    ```

#### Obtener asistencia por id

- Verbo: `GET`
- URL: `/asistencia/{int}`
- Descripción: Retorna una asistencia disponible buscando por su id.
- ``Ejemplo de respuesta``:
    ```
        {
            "idEvento": int,
            "idUsuario: int
        }
    ```

#### Obtener asistencias de usuario

- Verbo: `GET`
- URL: `/asistencia/asistenciasUsuario/{int}`
- Descripción: Retorna las asistencias de un usuario.
- ``Ejemplo de respuesta``:
    ```
        {
            "idEvento": int,
            "idUsuario: int
        }
    ```

#### Obtener asistencias de evento

- Verbo: `GET`
- URL: `/asistencia/asistenciasEvento/{int}`
- Descripción: Retorna las asistencias de un evento.
- ``Ejemplo de respuesta``:
    ```
        {
            "idEvento": int,
            "idUsuario: int
        }
    ```

#### Insertar una nueva asistencia

- Verbo: `POST`
- URL: `/asistencia/`
- Descripción: Insertar una nueva asistencia.
- ``Ejemplo de solicitud``:
    ```
        {
            "idEvento": int,
            "idUsuario: int
        }
    ```

#### Actualizar una asistencia

- Verbo: `PUT`
- URL: `/asistencia/{int}`
- Descripción: Actualizar una asistencia existente.
- ``Ejemplo de solicitud``:
    ```
        {
            "idEvento": int,
            "idUsuario: int
        }
    ```

#### Eliminar una asistencia

- Método: `DELETE`
- URL: `/asistencia/{int}`
- Descripción: Elimina una asistencia existente según su ID.

## -----------------------------------------------------

### Categorías

#### Obtener todas las categorías

- Verbo: `GET`
- URL: `/categorias/`
- Descripción: Retorna todas las categorías disponibles.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "nombre": "string",
            "dependiente": int / null ,
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener categoría por id

- Verbo: `GET`
- URL: `/categorias/{int}`
- Descripción: Retorna una categoria disponible buscando por su id.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "nombre": "string",
            "dependiente": int / null ,
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener categoría por nombre

- Verbo: `GET`
- URL: `/categorias/nombre/{string}`
- Descripción: Retorna una categoria disponible buscando por su nombre.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "nombre": "string",
            "dependiente": int / null ,
            "createdAt": date,
            "updatedAt": date
        }
    ```

#### Obtener todas las categorías con todas las subcategorias

- Verbo: `GET`
- URL: `/categorias/agrupadas/`
- Descripción: Retorna todas las categorías disponibles juntos con todas las subcategorias agrupadas.
- ``Ejemplo de respuesta``:
    ```
    [
        {
            "id": int,
            "nombre": "string",
            "dependiente": int / null ,
            "createdAt": date,
            "updatedAt": date,
            "subcategorias":[
                {
                    "id": int,
                    "nombre": "string",
                    "dependiente": int / null ,
                    "createdAt": date,
                    "updatedAt": date,
                    "subcategorias":[
                         .............
                    ]
                },
                .............
            ]
        },
        .............
    ]
    ```

#### Obtener categoria junto con las subcategorias directas

- Verbo: `GET`
- URL: `/categorias/agrupadas/{id}`
- Descripción: Retorna  una categoría juntos con las  subcategorias directas.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": int,
            "nombre": "string",
            "dependiente": int / null ,
            "createdAt": date,
            "updatedAt": date,
            "subcategorias":[
                {
                    "id": int,
                    "nombre": "string",
                    "dependiente": int / null ,
                    "createdAt": date,
                    "updatedAt": date
                },
                .............
            ]
        },
    ```

#### Insertar una nueva categoría

- Método: `POST`
- URL: `/categorias/`
- Descripción: Inserta una nueva categoría.
- ``Ejemplo de solicitud``:
    ```
    {
        "id": int,
        "nombre": "string",
        "dependiente": int / null 
    }
    ```

#### Actualizar una categoría

- Método: `PUT`
- URL: `/categorias/{int}`
- Descripción: Actualiza una categoría existente.
- Ejemplo de solicitud:
``Ejemplo de solicitud``:
    ```
    {
        "id": int,
        "nombre": "string",
        "dependiente": int / null 
    }
    ```

#### Eliminar una categoría

- Método: `DELETE`
- URL: `/categorias/{int}`
- Descripción: Elimina una categoría existente según su ID.

## -----------------------------------------------------

### Noticias

#### Obtener todas las noticias

- Verbo: `GET`
- URL: `/noticias/`
- Descripción: Retorna todas las noticias disponibles.
- ``Ejemplo de respuesta``
    ```
    [
        {
            "id": {int},
            "titulo": {string}
            "enlace": {url},
            "idCategoria":{int},
            "foto": "{url}",
            "createdAt": {date},
            "updatedAt": {date}
        },
        .............
    ]
    ```

#### Obtener noticia por id

- Verbo: `GET`
- URL: `/noticias/{int}`
- Descripción: Retorna una noticia si esta disponible buscando su id.
- ``Ejemplo de respuesta``
    ```
       {
            "id": {int},
            "titulo": {string}
            "enlace": {url},
            "idCategoria":{int},
            "foto": "{url}",
            "createdAt": {date},
            "updatedAt": {date}
        }
    ```

#### Obtener todas las noticias por categpria

- Verbo: `GET`
- URL: `/noticias/categoria/{int}`
- Descripción: Retorna todas las noticias buscando la id de la categoria a la que pertenecen.
``Ejemplo de respuesta``
    ```
    [
        {
            "id": {int},
            "titulo": {string}
            "enlace": {url},
            "idCategoria":{int},
            "foto": "{url}",
            "createdAt": {date},
            "updatedAt": {date}
        },
        .............
    ]
    ```

#### Obtener todas las noticias junto con las secciones y los enlaces

- Verbo: `GET`
- URL: `/noticias/secciones/`
- Descripción: Retorna todas las noticias disponibles juntos con todas las secciones y los enlaces de estas ultimas.
- ``Ejemplo de respuesta``:
    ```
    [
         {
            "id": {int},
            "titulo": {string}
            "enlace": {url},
            "idCategoria":{int},
            "foto": "{url}",
            "createdAt": {date},
            "updatedAt": {date},
            "secciones":[
                {
                    "id": {int},
                    "idNoticia": {int},
                    "titulo": {string},
                    "texto": {string},
                    "foto": {url},
                    "createdAt": {date},
                    "updatedAt": {date},
                    enlaces:[
                        {
                            "id": {int},
                            "idSeccion": {int},
                            "textoClave": {string},
                            "url": {url},
                            "createdAt": {date},
                            "updatedAt": {date},
                        },
                        .............
                    ]
                },
                .............
            ]
        },
        .............
    ]
    ```

#### Obtener una  noticia junto con las secciones y los enlaces

- Verbo: `GET`
- URL: `/noticias/secciones/{int}`
- Descripción: Retorna  una noticia junto con las  secciones y sus enlaces.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": {int},
            "titulo": {string}
            "enlace": {url},
            "idCategoria":{int},
            "foto": "{url}",
            "createdAt": {date},
            "updatedAt": {date},
            "secciones":[
                {
                    "id": {int},
                    "idNoticia": {int},
                    "titulo": {string},
                    "texto": {string},
                    "foto": {url},
                    "createdAt": {date},
                    "updatedAt": {date},
                    enlaces:[
                        {
                            "id": {int},
                            "idSeccion": {int},
                            "textoClave": {string},
                            "url": {url},
                            "createdAt": {date},
                            "updatedAt": {date},
                        },
                        .............
                    ]
                },
                .............
            ]
        }
    ```

#### Insertar una nueva noticia

- Método: `POST`
- URL: `/noticias/`
- Descripción: Inserta una nueva noticia.
- ``Ejemplo de solicitud``:
    ```
    {
        "id": {int},
        "titulo": {string}
        "enlace": {url},
        "idCategoria":{int},
        "foto": "{url}"
    }
    ```

#### Actualizar una noticia

- Método: `PUT`
- URL: `/noticias/{int}`
- Descripción: Actualiza una noticia existente.
- Ejemplo de solicitud:
``Ejemplo de solicitud``:
    ```
    {
        "id": {int},
        "titulo": {string}
        "enlace": {url},
        "idCategoria":{int},
        "foto": "{url}",
    }
    ```

#### Eliminar una noticia

- Método: `DELETE`
- URL: `/noticias/{int}`
- Descripción: Elimina una noticia existente según su ID.

## -----------------------------------------------------

### Secciones

#### Obtener todas las secciones

- Verbo: `GET`
- URL: `/secciones/`
- Descripción: Retorna todas las secciones disponibles.
- ``Ejemplo de respuesta``
    ```
    [
        {
            "id": {int},
            "idNoticia": {int},
            "titulo": {string},
            "texto": {int},
            "foto": {url},
            "createdAt": {date},
            "updatedAt": {date}
        },
        ...........
    ] 
    ```

#### Obtener sección por id

- Verbo: `GET`
- URL: `/secciones/{int}`
- Descripción: Retorna una sección si esta disponible buscando su id.
- ``Ejemplo de respuesta``
    ```
       {
            "id": {int},
            "idNoticia": {int},
            "titulo": {string},
            "texto": {int},
            "foto": {url},
            "createdAt": {date},
            "updatedAt": {date}
        }
    ```

#### Obtener seccion por noticia

- Verbo: `GET`
- URL: `/secciones/noticia/{int}`
- Descripción: Retorna todas las seccies buscando la id de la noticia a la que pertenecen.
``Ejemplo de respuesta``
    ```
    [
        {
            "id": {int},
            "idNoticia": {int},
            "titulo": {string},
            "texto": {int},
            "foto": {url},
            "createdAt": {date},
            "updatedAt": {date}
        },
        ............
    ]
    
    ```

#### Obtener todas las secciones junto con sus enlaces

- Verbo: `GET`
- URL: `/secciones/enlaces`
- Descripción: Retorna todas las noticias disponibles juntos con todas las secciones y los enlaces de estas ultimas.
- ``Ejemplo de respuesta``:
    ```
    [
         {
            "id": {int},
            "idNoticia": {int},
            "titulo": {string},
            "texto": {int},
            "foto": {url},
            "createdAt": {date},
            "updatedAt": {date}.
            "enlaces":[
                 {
                    "id": {int},
                    "idSeccion": {int},
                    "textoClave": {string},
                    "url": {url},
                    "createdAt": {date},
                    "updatedAt": {date},
                },
                .............
            ]
        },
        .........
    ]
    ```

#### Obtener una  sección junto con sus enlaces

- Verbo: `GET`
- URL: `/secciones/enlaces/{int}`
- Descripción: Retorna  una noticia junto con las  secciones y sus enlaces.
- ``Ejemplo de respuesta``:
    ```
        {
            "id": {int},
            "idNoticia": {int},
            "titulo": {string},
            "texto": {int},
            "foto": {url},
            "createdAt": {date},
            "updatedAt": {date}.
            "enlaces":[
                 {
                    "id": {int},
                    "idSeccion": {int},
                    "textoClave": {string},
                    "url": {url},
                    "createdAt": {date},
                    "updatedAt": {date},
                },
                .............
            ]
        }
    ```

#### Insertar una nueva sección

- Método: `POST`
- URL: `/seccion/`
- Descripción: Inserta una nueva sección.
- ``Ejemplo de solicitud``:
    ```
    {
        "id": {int},
        "idNoticia": {int},
        "titulo": {string},
        "texto": {int},
        "foto": {url}
    }
    ```

#### Actualizar una seccion

- Método: `PUT`
- URL: `/seccion/{int}`
- Descripción: Actualiza una sección existente.
- Ejemplo de solicitud:
``Ejemplo de solicitud``:
    ```
    {
        "id": {int},
        "idNoticia": {int},
        "titulo": {string},
        "texto": {int},
        "foto": {url},
    }
    ```

#### Eliminar una seccion

- Método: `DELETE`
- URL: `/seccion/{int}`
- Descripción: Elimina una sección existente según su ID.

## -----------------------------------------------------

### Enlaces

#### Obtener todos los enlaces

- Verbo: `GET`
- URL: `/enlaces/`
- Descripción: Retorna todos los enlaces disponibles.
- ``Ejemplo de respuesta``
    ```
    [
        {
            "id": {int},
            "idSeccion": {int},
            "textoClave": {int},
            "url": {string}",
            "createdAt": {date},
            "updatedAt": {date}
        },
        .............
    ]
    ```

#### Obtener enlace por id

- Verbo: `GET`
- URL: `/enlaces/{int}`
- Descripción: Retorna un enlace si esta disponible buscando su id.
- ``Ejemplo de respuesta``
    ```
         {
            "id": {int},
            "idSeccion": {int},
            "textoClave": {int},
            "url": {string}",
            "createdAt": {date},
            "updatedAt": {date}
        }
    ```

#### Obtener enlaces por sección

- Verbo: `GET`
- URL: `/enlaces/seccion/{int}`
- Descripción: Los enlaces buscando la id de la sección a la que pertenecen.
``Ejemplo de respuesta``
    ```
        [
            {
                "id": {int},
                "idSeccion": {int},
                "textoClave": {int},
                "url": {string}",
                "createdAt": {date},
                "updatedAt": {date}
            },
            .......
        ]
    ```

#### Insertar un nuevo enlace

- Método: `POST`
- URL: `/enlaces/`
- Descripción: Inserta un nuevo enlace.
- ``Ejemplo de solicitud``:
    ```
        {
            "id": {int},
            "idSeccion": {int},
            "textoClave": {int},
            "url": {string}"
        }
    ```

#### Actualizar un enlace

- Método: `PUT`
- URL: `/enlaces/{int}`
- Descripción: Actualiza un enlace existente.
``Ejemplo de solicitud``:
    ```
   {
        "id": {int},
        "idSeccion": {int},
        "textoClave": {int},
        "url": {string}",
    }
    ```

#### Eliminar un enlace

- Método: `DELETE`
- URL: `/enlaces/{int}`
- Descripción: Elimina una enlace existente según su ID.

## -----------------------------------------------------

### Usuario

#### Obtener todos los usuarios

- Verbo: `GET`
- URL: `/usuario/`
- Descripción: Retorna todos los usuarios disponibles.
- ``Ejemplo de respuesta``
    ```
    [
        {
            "id": {int},
            "nombre": {string},
            "email": {string},
            "password": {string}",
            "createdAt": {date},
            "updatedAt": {date}
        },
        .............
    ]
    ```

#### Obtener usuario por id

- Verbo: `GET`
- URL: `/usuario/{int}`
- Descripción: Retorna un usuario si esta disponible buscando su id.
- ``Ejemplo de respuesta``
    ```
         {
            "id": {int},
            "nombre": {string},
            "email": {string},
            "password": {string}",
            "createdAt": {date},
            "updatedAt": {date}
        }
    ```

#### Insertar un nuevo usuario

- Método: `POST`
- URL: `/usuario/`
- Descripción: Inserta un nuevo usuario.
- ``Ejemplo de solicitud``:
    ```
        {
            "nombre": {string},
            "email": {string},
            "password": {string}
        }
    ```

#### Actualizar un usuario

- Método: `PUT`
- URL: `/usuario/{int}`
- Descripción: Actualiza un usuario existente.
``Ejemplo de solicitud``:
    ```
   {
        "nombre": {string},
        "email": {string},
        "password": {string}
    }
    ```

#### Eliminar un usuario

- Método: `DELETE`
- URL: `/usuario/{int}`
- Descripción: Elimina un usuario existente según su ID.

## -----------------------------------------------------

### Roles

#### Obtener todos los roles

- Verbo: `GET`
- URL: `/roles/`
- Descripción: Retorna todos los roles disponibles.
- ``Ejemplo de respuesta``
    ```
    [
        {
            "id": {int},
            "nombre": {string},
            "createdAt": {date},
            "updatedAt": {date}
        },
        .............
    ]
    ```

#### Obtener rol por id

- Verbo: `GET`
- URL: `/roles/{int}`
- Descripción: Retorna un rol si esta disponible buscando su id.
- ``Ejemplo de respuesta``
    ```
         {
            "id": {int},
            "nombre": {string},
            "createdAt": {date},
            "updatedAt": {date}
        }
    ```

#### Insertar un nuevo rol

- Método: `POST`
- URL: `/roles/`
- Descripción: Inserta un nuevo rol.
- ``Ejemplo de solicitud``:
    ```
        {
            "nombre": {string}
        }
    ```

#### Actualizar un rol

- Método: `PUT`
- URL: `/roles/{int}`
- Descripción: Actualiza un rol existente.
``Ejemplo de solicitud``:
    ```
        {
            "nombre": {string}
        }
    ```

#### Eliminar un rol

- Método: `DELETE`
- URL: `/roles/{int}`
- Descripción: Elimina un rol existente según su ID.

## -----------------------------------------------------

### Roles asignados

#### Obtener todos los roles asignados por usuario

- Verbo: `GET`
- URL: `/rolesAsignados/{int}`
- Descripción: Retorna todos los roles asignados disponibles por usuario buscado por id.
- ``Ejemplo de respuesta``
    ```
    [
        {
            "id": {int},
            "idUser": {int},
            "idRol": {string},
            "createdAt": {date},
            "updatedAt": {date}
        },
        .............
    ]
    ```

#### Insertar un nuevo rol asignado

- Método: `POST`
- URL: `/rolesAsignados/`
- Descripción: Inserta un nuevo rol asignado.
- ``Ejemplo de solicitud``:
    ```
        {
            "idUser": {string},
            "idRol": {string}
        }
    ```

#### Actualizar un rol asignado

- Método: `PUT`
- URL: `/rolesAsignados/{int}`
- Descripción: Actualiza un rol asignado existente.
``Ejemplo de solicitud``:
    ```
        {
            "idUser": {string},
            "idRol": {string}
        }
    ```

#### Eliminar un rol asignado

- Método: `DELETE`
- URL: `/rolesAsignados/{int}`
- Descripción: Elimina un rol asignado existente según su ID.
