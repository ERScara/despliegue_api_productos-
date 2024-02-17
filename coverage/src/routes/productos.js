const express = require("express");
const route = express.Router();


const ProductoController = require("../controllers/productoController");

const { requiredScopes } = require("express-oauth2-jwt-bearer");


route.get("/", ProductoController.getAllProductos);

// Obtener un producto por ID
route.get("/:id", requiredScopes("read:productos"), ProductoController.getProductoById);

// Crear un nuevo producto
route.post("/", requiredScopes("write:productos"),  ProductoController.createProducto);

// Actualizar un producto existente
route.put("/:id", requiredScopes("write:productos"),  ProductoController.updateProductoById);

// Eliminar un producto
route.delete("/:id", requiredScopes("write:productos"),  ProductoController.deleteProductoById);

module.exports = route;
