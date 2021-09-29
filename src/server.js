import express from "express";
import cors from "cors";
import { connectDB } from "./db/db-init.js";
import productsRouter from "./services/products/index.js";
const server = express();

const { PORT = 5000 } = process.env;

server.use(cors());

server.use(express.json());

server.use("/products", productsRouter);
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
