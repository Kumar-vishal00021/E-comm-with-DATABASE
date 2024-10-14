// let id=0;
// let carts=[];

import { Db } from "../routes/Db.js";
export default class Cart{
    constructor(userId,productId,quantity){
        this.userId=userId;
        this.productId=productId;
        this.quantity=quantity;
    }
   
}