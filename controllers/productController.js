const { productModel } = require("../models/productModel");

const addNewProduct = async (req, res) => {
  let data = req.body;
  try {
    let newProduct = new productModel({ ...data });
    await newProduct.save();
    res.status(200).json({ message: "product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get product by id
const getById = async (req, res) => {
  let id = req.params.id;
  try {
    let product = await productModel.findById(id);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    res.status(200).json({
      message: "product updated successfully",
      newProduct: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
    let deleteProduct = await productModel.findByIdAndDelete(id);
    res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const productsList = async (req, res) => {
  let query = req.query;
  let { _sort, _page = 1 } = query;
  let Limit = 8;

  let Skip = Limit * (_page - 1);

  try {
    let count = await productModel.find().countDocuments();
    let totalPages = Math.ceil(count / Limit);
    if (_sort) {
      let products = await productModel
        .find()
        .limit(Limit)
        .skip(Skip)
        .sort({ name: _sort === "asc" ? 1 : -1 });

      res.status(200).json({ products, totalPages });
    } else {
      let products = await productModel.find().limit(Limit).skip(Skip);

      res.status(200).json({ products, totalPages });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchProducts = async (req, res) => {
  let query = req.query;
  let { q } = query;
  try {
    let products = await productModel
      .find({
        name: { $regex: q, $options: "i" },
      })
      .limit(10);

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  productsList,
  searchProducts,
};
