# Notas y detalles de la refactorizacion del proyecto Node

## Estructura del Proyecto

Se hicieron cambios en la estructura del proyecto facilitando así su extensión y mantenimiento. Los archivos y carpetas principales son:

- `server.js`: Archivo principal que inicia el servidor y configura los middlewares globales.
- `database.js`: Gestiona la conexión con MongoDB, asegurando una configuración centralizada que puede ser reutilizada.
- `models/`: Contiene los modelos de Mongoose, por ahora solo `Post.js`, que define el esquema para los posts.
- `routes/`: Define las rutas específicas del API, separadas por recursos, empezando con `posts.js`.

Con esta organización, mejoramos las practicas y permitimos que el código sea mas fácil de entender, apoyando la extensibilidad y mantenibilidad.

## Cambios Implementados

### Mejoras en Manejo de Rutas y Modelos

Las rutas se reorganizaron utilizando el `router` de Express, lo que permite manejar de forma más eficiente las diferentes acciones relacionadas con los posts. Además, la lógica de los modelos se puso en un directorio separado, permitiendo una fácil extensión a medida que el proyecto crece.

### Creacion de "Servicios"

Se agrego una nueva capa de services, con el objetivo de encapsular y separar las responsabilidades de los metodos relacionados a la base de datos.
Las llamadas en vez de realizarse directamente hacia los modelos, se hacen hacia esta capa de servicios.

### Manejo de Errores

Se implementaron dos niveles de manejo de errores:

1. **Manejadores de errores específicos**: Cada ruta incluye un bloque `try/catch` para capturar y manejar errores de manera localizada, pasando los errores no manejados al siguiente middleware mediante `next(err)`.

2. **Manejador de errores global**: En `server.js`, este middleware de error captura cualquier error no manejado en las rutas.

### Seguridad y Configuración

La configuración del puerto y la conexión a la base de datos ahora se manejan a través de variables de entorno, mejorando la seguridad y facilitando la configuración del entorno sin necesidad de modificar el código fuente. E

## TESTS
Para asegurar el correcto funcionamiento del sistema, podriamos usar diferentes tipos de tests:

1. **Pruebas Unitarias:** Para verificar el comportamiento de los componentes aislados, como funciones individuales y modelos de Mongoose. Estas pruebas nos sirven para asegurar que cada módulo funciona correctamente por sí solo.

```
// Ejemplo de prueba unitaria para el modelo de Post
describe('Post Model', () => {
  it('should be invalid if title is empty', () => {
    const Post = require('../models/Post');
    const post = new Post();

    post.validate(err => {
      expect(err.errors.title).toBeDefined();
    });
  });
});
```

2.**Pruebas de Integración:** Estas pruebas evalúan la colaboración entre varios componentes, como la interacción entre las rutas de Express y la base de datos MongoDB.
```
// Ejemplo de prueba de integración para la creación de un post
const request = require('supertest');
const app = require('../server'); // Asegúrate de que app sea exportable desde tu server.js

describe('POST /posts/create', () => {
  it('should create a new post and return 201 status', async () => {
    const res = await request(app)
      .post('/posts/create')
      .send({
        title: 'Test Integration',
        body: 'Integration test body'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('Test Integration');
  });
});
```
3.**Pruebas de Sistema:** Pruebas completas que simulan escenarios de uso real, para asegurar el correcto funcionamiento del sistema.
4.**Pruebas de Regresión:(Opcional para este caso)** Pruebas que aseguran que cambios y modificaciones no afecten el funcionamiento del sistema.