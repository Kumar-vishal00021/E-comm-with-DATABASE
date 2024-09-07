import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from 'uuid';

const roleStatusMapping = {
    'customer': ['ordered', 'cancelled'],
    'seller': ['cancelled', 'ready to ship'],
    'logistics': ['delivered']
}
const statusRoleMapping = {
    "ordered": ['customer', 'seller']

}

function placeOrder(req, res){
    return res.status(200).json({status: true, data: "something"})
}
export {placeOrder}