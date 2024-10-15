import express from "express";
import { auth, customerCheck } from "../middlewares/auth.js";
import { placeOrder } from "../controllers/order.controler.js";
import CartController from "../controllers/cart.controller.js";
import ProductController from "../controllers/product.controller.js";
import UserController from "../controllers/user.controler.js"
const userController = new UserController();
const productController = new ProductController();
const cartController = new CartController();
const router = express.Router();
//adding product and get all product
router.route('/product')
  .post(productController.addProduct)
  .get(auth,productController.getAllProduct)
//get speccific product by id
router.route('/product/:productId')
  .get(productController.getProductById);
//rate product
router.route("/product/:productId/rate")
  .post(auth,productController.rateProduct);
//sign up for new user
  router.route("/user/signup")
  .post(userController.signup);

//sign in for signed up user
router.route("/user/signin")
  .get(userController.signin);
//return all user who alredy signed up
router.route("/user")
  .get(userController.getAllUsers);

router.route('/order/:productId')
  .post(customerCheck, placeOrder)

router.route("/cart")
   .get(auth,cartController.getCartByUser)
   .post(auth,cartController.addToCartController)
router.route("/cart/:itemId")
    .delete(auth,cartController.removeFromCartController)
export default router;