import Product from "../models/product.model.js";
import{v4 as uuidv4} from "uuid";
import User from "../models/user.model.js";
import { logger } from "../middlewares/custom.logger.js";
import { winstonLogger } from "../../winston.logger.js";
import { ObjectId } from "mongodb";
import ProductRepository from "../repository/product.repository.js";
import UserRepository from "../repository/user.repository.js";
//adding product 
class ProductController{
   constructor(){
      this.productRepository = new ProductRepository();
      this.userRepository = new UserRepository();
   }
   addProduct=(req,res)=> {
      const{name,price,description,quantity}=req.body;
      // const id=uuidv4();
      if(!name || !price || !description || !quantity){
       let missingField=[];
       if(!name)missingField.push("name");
       if(!price)missingField.push("price");
       if(!description)missingField.push("description");
       if(!quantity)missingField.push("quantity");
       return res.status(400).json({
         status:false,
         error:"failur in adding product",
         message:`${missingField.toString(",")}  field need to be sent `
      });
      }
      try{
        this.productRepository.addProduct(name,price,description,quantity);
      }
      catch(err){
       return res.status(500).json({
         status:false,
         err,
         message:"Something Went Wrong!"
      })
      }
      return res.status(200).json({
         status:true,
         message:"Product Added Successfully"
      });
   }
   //return all products
   getAllProduct =async (req,res)=> {
      const filters=req.query;
      let allProducs=[];
      logger(req.query);
      winstonLogger.info('first timer!! go easy');
      winstonLogger.error('rjrjogjewofe');
     try{
       allProducs=await this.productRepository.getAllProduct(filters);
      //  console.log(allProducs)
     }
     catch(err){
        return res.status(500).json({
         status:false,
         err,
         message:"Something Went Wrong!"
      });
     }
      return (res.status(200).json({
         "status":true,
         product:allProducs
      }));
   }
   //return one product by specific id
   getProductById=async (req,res)=> {
      // const productId=req.params.productId;
      const { productId } = req.params;
      if(!productId) return res.status(400).json({
         status:false,
         error:"Id is missing!"
      });
      try{
        const newProduct= await this.productRepository.getProductById(productId);
      //   console.log(newProduct);
        return( res.status(200).json({
         status:true,
         product:newProduct
      }))
      }
      catch(error){
         console.error('Database error:', error.message || error);
         return res.status(500).json({
            status:false,
            error,
            message:"Something went wrong "
         });
      }
   }
   
   rateProduct=async (req, res) =>{
      const userId = req?.user.id;
      // console.log("userid=",userId);
      const productId = req?.params?.productId;
   
      if (!userId) {
         return res.status(400).json({
            status: false,
            err: "User not found",
            message: "User id is not found"
         });
      }
      const user = await this.userRepository.getUserById(userId); // Assuming async
      if (!user) {
         return res.status(400).json({
            status: false,
            err: "User not found",
            message: `User with this id ${userId} is not found`
         });
      }
   
      const { rating } = req.body;
      if (!rating) {
         return res.status(400).json({
            status: false,
            err: "You can't rate at the moment",
            message: "Rating is empty, select any"
         });
      }
   
      try {
        const ratingUpdate= await this.productRepository.addProductRating(productId, userId, rating); // Assuming async
         return res.status(200).json({
            status: true,
            message: "Rated successfully"
         });
      } catch (err) {
         return res.status(500).json({
            status: false,
            err,
            message: "Something went wrong while rating"
         });
      }
   }
   
}
export default ProductController;