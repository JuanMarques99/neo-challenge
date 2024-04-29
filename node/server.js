const express = require('express');
const dbConnect = require('./database');
const postsRouter = require('./routes/posts');
require('dotenv').config();


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
dbConnect();

// Routes
app.use('/posts', postsRouter);

// Global error handler
// A esto se le podria agregar una validacion de ambiente, y tener distintos mensajes de error, dependiendo del ambiente (dev, prod, etc)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
