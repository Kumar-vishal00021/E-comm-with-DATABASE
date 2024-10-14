import { Db } from "../routes/Db.js";
const collectionName="Cart"
import { ObjectId } from "mongodb";
import Cart from "../models/cart.model.js";
class CartRepository{
    async getCartByUserId(userId){
        const collection=await Db().collection(collectionName);
        const cart=collection.find({userId:userId}).toArray();
        // const cart=carts.filter((cart)=>{
        //     return cart.userId==userId;
        // })
        return cart;
    }
    async addToCart(userId,productId,quantity){
        const collection=await Db().collection(collectionName);
        const newCart={userId,productId,quantity};
        collection.insertOne(newCart);
        return newCart;
    }
    async removeFromCart(userId,cartItemId){
        const collection=await Db().collection(collectionName);
        const deletedCartItem=await collection.deleteOne({_id:new ObjectId(cartItemId),userId})
    //     const cartItemIndex=carts.findIndex((cart)=>{
    //         return cart.id==cartItemId;
    //     });
    //     if(cartItemIndex>=0){
    //         const itemToDelete=carts[cartItemIndex];
    //         carts.splice(cartItemIndex,1);
    //         return {"success":true,deletedCartItem:itemToDelete};
    //     }else{
    //         return {
    //             success: false,
    //             msg: "operation not allowed",
    //         };
    //     }
    return deletedCartItem;
    }
}
export default CartRepository;