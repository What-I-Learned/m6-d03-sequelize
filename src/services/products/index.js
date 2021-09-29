import express from "express";
import db from "../../db/models/index.js";
import s from "sequelize";
const { Op } = s;
const productsRouter = express.Router();
const { Product, Review } = db;

productsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll({
      include: Review,

      where: req.query.search
        ? {
            [Op.or]: [{ name: { [Op.iLike]: `%${req.query.search}%` } }],
          }
        : {},
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(data[0]);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const rows = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (rows > 0) {
      res.send("ok");
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
export default productsRouter;
