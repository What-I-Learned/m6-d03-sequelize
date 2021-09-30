import Category from "./categories.js";
import Product from "./products.js";
import Review from "./reviews.js";
import User from "./user.js";

//1. choose the type of relationship (1:1, 1:n, n:m)
// 2. understand what methods to use for this specific type of relationship
// hasMany & belongsTo
//3. understand for each association which model is TARGET & which model is SOURCE
// A.hasMany(B) => foreign key in the the TARGET B model
Product.hasMany(Review); // => authorId  Author.findAll({include: Article})
Review.belongsTo(Product); // => Article.findAll({include:Author})

// categories
Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
});

// user
User.belongsToMany(Product, {
  through: {
    model: ProductsAndCategories,
    unique: true,
  },
});
Product.belongsToMany(ProductCategory, {
  through: { model: ProductsAndCategories, unique: true },
});

export default { Product, Review };
