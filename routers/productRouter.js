const express = require("express");
const {
  addNewProduct,
  productsList,
  updateProduct,
  deleteProduct,
  getById,
  searchProducts,
} = require("../controllers/productController");
const { Authentication } = require("../middleware/authentication");

productRouter = express.Router();

// ADD NEW PRODUCT
productRouter.post("/add", Authentication, addNewProduct);
// GET SIGNLE PRODUCT
productRouter.get("/getById/:id", getById);

// UPDATE PRODUCT DETAILS
productRouter.put("/update/:id", Authentication, updateProduct);

// DELETE A SPECIFIC PRODUCT BY ITS ID.
productRouter.delete("/delete/:id", Authentication, deleteProduct);

// GET LIST OF PRODUCTION
productRouter.get("/list", productsList);
// SEARCH PRODUCTS;

productRouter.get("/search", searchProducts);

module.exports = { productRouter };
