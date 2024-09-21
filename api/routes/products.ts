import express from 'express';
import Category from '../models/Category';
import Product from '../models/Product';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category;
    const filter: Record<string, unknown> = {};
    if(category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    return res.send(products);
  } catch (error) {
    return next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category').populate('user', 'name phone');

    if(product === null) {
      return res.status(404).send({error: 'Product not found'});
    }

    return res.send(product);
  } catch (error) {
    return next(error);
  }
});

productsRouter.post('/', imagesUpload.single('image'), auth, async (req: RequestWithUser, res, next) => {
  try {
    const category = await Category.findById(req.body.category);
    if(!category) {
      return res.status(400).send({error: 'Category not found'});
    }

    const newProduct = new Product({
      user: req.user?._id,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      image: req.file && req.file.filename,
      price: parseFloat(req.body.price),
    });

    await newProduct.save();
    return res.send(newProduct);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default productsRouter;