const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try{
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Conectado a MongoDB");
  } catch (error) {
  console.error(error);
}
}
const ProductoSchema = new mongoose.Schema(
  {     
    nombre: String,
    precio: String,
  },
  { collection: "productos" }
);

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;
