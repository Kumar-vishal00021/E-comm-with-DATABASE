import express from "express";
import {addProduct,getAllProduct,getProductById, rateProduct} from "../controllers/product.controller.js";
import { getAllUser, signin, signup } from "../controllers/user.controler.js";
import { auth, customerCheck } from "../middlewares/auth.js";
import { placeOrder } from "../controllers/order.controler.js";
import { addToCartController, getCartByUser, removeFromCartController } from "../controllers/cart.controller.js";
const router = express.Router();
//adding product and get all product
router.route('/product')
  .post(addProduct)
  .get(auth,getAllProduct)
//get speccific product by id
router.route('/product/:productId')
  .get(getProductById);
//rate product
router.route("/product/:productId/rate")
  .post(auth,rateProduct);
//sign up for new user
  router.route("/user/signup")
  .post(signup);

//sign in for signed up user
router.route("/user/signin")
  .get(signin);
//return all user who alredy signed up
router.route("/user")
  .get(getAllUser);


router.route('/order/:productId')
  .post(customerCheck, placeOrder)

router.route("/cart")
   .get(auth,getCartByUser)
   .post(auth,addToCartController)
router.route("/cart/:itemId")
    .delete(auth,removeFromCartController)
export default router;