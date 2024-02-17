const express = require("express");
const productosRouter = require("./routes/productos");
const errorHandler = require("./middlewares/errorHandler");

const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const oauthCheck = auth ({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
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


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
 console.log("Servidor iniciado en el puerto 3000");
});

module.exports = app;