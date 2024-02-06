# CEPA_Antonio_Gala
## - Base URL: `http://localhost:9090/api`

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


