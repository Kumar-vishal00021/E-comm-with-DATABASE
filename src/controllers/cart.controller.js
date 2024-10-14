import Cart from "../models/cart.model.js"
import CartRepository from "../repository/cart.repository.js";
class CartController{
  constructor(){
    this.cartRepository = new CartRepository();
  }
  addToCartController = async (req, res) => {
    const {productId, quantity}=req.body;
    const userId=req.user.id;
    if(!userId || !productId || !quantity){
      return res.status(401).json({"success":false,msg:"required field is missing"});
    }
    const addedItem= await this.cartRepository.addToCart(userId,productId,quantity);
    return res.status(200).json({"success":true,"item":addedItem});
  };
  
   removeFromCartController =async (req, res) => {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const resp =await this.cartRepository.removeFromCart(userId, itemId);
    if (resp.acknowledged) {
      return res.status(200).json(resp);
    } else {
      return res.status(400).json(resp);
    }
  };
   getCartByUser=async(req,res)=>{
      const userId=req.user.id;
      const cartOfUser=await this.cartRepository.getCartByUserId(userId);
      if(cartOfUser.length>=0){
  
          res.status(200).json({
              "success":true,
              cartOfUser:cartOfUser,
          })
  
      }else{
          res.status(400).json({
              "success":false,
              msg:"Cart with this user is not Present!"
          })
      }
  }
}
export default CartController;