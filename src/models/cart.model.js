let id=0;
let carts=[];
export default class Cart{
    constructor(userId,productId,quantity){
        this.id=++id;
        this.userId=userId;
        this.productId=productId;
        this.quantity=quantity;
    }
    static getCartByUserId(userId){
        const cart=carts.filter((cart)=>{
            return cart.userId==userId;
        })
        return cart;
    }
    static addToCart(userId,productId,quantity){
        const newCart=new Cart(userId,productId,quantity);
        carts.push(newCart);
        return newCart;
    }
    static removeFromCart(userId,cartItemId){
        const cartItemIndex=carts.findIndex((cart)=>{
            return cart.id==cartItemId;
        });
        if(cartItemIndex>=0){
            const itemToDelete=carts[cartItemIndex];
            carts.splice(cartItemIndex,1);
            return {"success":true,deletedCartItem:itemToDelete};
        }else{
            return {
                success: false,
                msg: "operation not allowed",
            };
        }
    }
}