import express from "express";
import db from "../../db/models/index.js";
import s from "sequelize";
const { Op } = s;
const productsRouter = express.Router();
const { Product, Review, Category, User } = db;

productsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll({
      include: [
        User,
        { model: Category, through: { attributes: [] } },
        { model: Review, attributes: { include: ["username"] } },
      ],

      order: [["price", "DESC"]],
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
    const data = await Product.findByPk(req.params.id, {
      include: [
        { model: User, through: { attributes: [] } },
        { model: Category, through: { attributes: [] } },
        { model: Review, attributes: { include: ["username"] } },
      ],
    });
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

productsRouter.delete("/:id", async (req, res, next) => {
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

productsRouter.post("/addCategory", async (req, res, next) => {
  try {
    const data = await productCategories.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
productsRouter.delete("/addCategory/:categoryId", async (req, res, next) => {
  try {
    const rows = await productCategories.destroy({
      where: {
        id: req.params.categoryId,
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
