const http = require("http");
const express = require("express");
const productosRouter = require("./routes/productos");
const errorHandler = require("./middlewares/errorHandler");
const shutdown = require("http-shutdown");
const mongoose = require("mongoose");
const { auth } = require("express-oauth2-jwt-bearer");
const { start } = require("repl");

require("dotenv").config();

const oauthCheck = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});

mongoose.connect( process.env.MONGO_DB , {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();
app.use(express.json())


// Ruta base
app.get("/", (req, res) => {
  res.send("API de productos");
});


// Ruta base
app.get("/health", (req, res) => {
  res.send("OK");
});


// Rutas de productos
app.use("/api/productos",oauthCheck, productosRouter);

app.use(errorHandler);

const server = http.createServer(app);

const PORT = 3000;
//function startServer() {
  //server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`API de productos escuchando en el puerto ${PORT}...`);	
  });
//}

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down server gracefully...');
  server.shutdown(() => {
    console.log('Server shut down gracefully. Exiting process.');
    process.exit(0);
  });
});

shutdown (server);

module.exports = app;