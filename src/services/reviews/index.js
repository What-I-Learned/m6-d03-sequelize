import express from "express";
import db from "../../db/models/index.js";
import s from "sequelize";
const { Op } = s;
const reviewsRouter = express.Router();
const { Product, Review } = db;

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Review.findAll({
      include: Product,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Review.findByPk(req.params.id);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

reviewsRouter.post("/new_review/:productID", async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const newReview = {
      ...req.body,
      ProductId: productID,
    };
    const data = await Review.create(newReview);
    // data.ProductId = productID;
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

reviewsRouter.put("/:id", async (req, res, next) => {
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

reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Review.destroy({ where: { id: req.params.id } });
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
export default reviewsRouter;
