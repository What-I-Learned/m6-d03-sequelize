import express from "express";
import db from "../../db/models/index.js";

const { Op } = s;
const userRouter = express.Router();

const { User, Product } = db;

userRouter.get("/", async (req, res, next) => {
  try {
    const data = await Author.findAll({
      include: Product,
      wher: req.query.search
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${req.query.search}%` } },
              { surname: { [Op.iLike]: `%${req.query.search}%` } },
              { email: { [Op.iLike]: `%${req.query.search}%` } },
            ],
          }
        : {},
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

userRouter.get("/:userId", async (req, res, next) => {
  try {
    const data = await User.findOne({
      where: { id: req.params.userId },
      include: Product,
    });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const data = await User.create(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

userRouter.put("/:userId", async (req, res, next) => {
  try {
    const data = await User.update(req, body, {
      where: { id: req.params.userId },
      returning: true,
    });
    res.send(data[0]);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

userRouter.delete("/:userId", async (req, res, next) => {
  try {
    const rows = await User.destroy({ where: { id: req.params.userId } });
    if (rows > 0) {
      res.send("ok");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
export default userRouter;
