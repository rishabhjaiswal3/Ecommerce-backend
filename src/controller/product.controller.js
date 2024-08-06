const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const poductId = req.params.id;
  try {
    const product = await productService.deleteProduct(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const poductId = req.params.id;
  try {
    const product = await productService.updateProduct(productId,req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};



const findProductById = async (req,res) => {
    const poductId = req.params.id;
    try {
      const product = await productService.findProductByid(productId);
      return res.status(201).send(product);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
}

const getAllProducts = async (req,res) => {
    try {
      const products = await productService.getAllProducts(req.query);
      return res.status(201).send(products);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
}


const createMultiProducts = async (req,res) => {
    try {
      const products = await productService.createMultiProduct(req.body);
      return res.status(201).send({message:"Products Created Successfully",status:true});
    } 
    catch (error) {
      return res.status(500).send({ message: error.message });
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultiProducts
}

