import express from "express";
import db from "../../db/models/index.js";
const categoryRouter = express.Router();
const { Product, User, Category } = db;

categoryRouter.get("/", async (req, res, next) => {
  try {
    const data = await Category.findAll();
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

categoryRouter.get("/:categoryId", async (req, res, next) => {
  try {
    const data = await Category.findOne({
      where: { id: req.params.categoryId },
    });
    data ? res.send(data) : res.status(404).send("Not found");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const data = await Category.bulkCreate([
      { categoryName: "phones" },
      { categoryName: "tablets" },
      { categoryName: "others" },
    ]);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

categoryRouter.put("/:categoryId", async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err);
    next(err);
  }
});

categoryRouter.delete("/:categoryId", async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err);
    next(err);
  }
});
export default categoryRouter;
