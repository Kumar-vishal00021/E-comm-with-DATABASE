import { ObjectId } from "mongodb";
import { Db } from "../routes/Db.js";

const collectionName="Product"

export default class Product{
    constructor(name,price,rating,description,quantity,creatorId,userRatingCount,userRatingMapping){
       this.name=name;
       this.price=price;
       this.rating=rating;
       this.description=description;
       this.quantity=quantity;
       this.creatorId=creatorId;
       this.userRatingCount=userRatingCount;
       this.userRatingMapping=userRatingMapping;
    }
    static async getAllProduct(filters) { 
        const collection= await Db().collection(collectionName);
        const {minPrice,maxPrice}=filters;
        const Products=await collection.find({}).toArray();
        const filteredProduct=Products.filter((entry)=>{
            return (
                ( 
                    (!filters.minPrice || entry.price >= parseInt(filters.minPrice)) && 
                    (!filters.maxPrice || entry.price <= parseInt(filters.maxPrice))
                )
            )
        })
        return filteredProduct;
    }
    static async addProduct(name,price,description,quantity){
        const collection= await Db().collection(collectionName);
       const newProduct=new Product(name,price,0,description,quantity,911,0);
       await collection.insertOne(newProduct);
    //    products.push(newProduct);
    }
    static async getProductById(id){
        const collection= await Db().collection(collectionName);
        const filteredProduct=await collection.findOne({_id: new ObjectId(id)});
        // const filteredProduct=products.find((entry)=>{
        //     return entry.id == id;
        // })
        // console.log(filteredProduct)
        return filteredProduct;
    }
    static async addProductRating(productId,userId,rating){
        const selectedProduct=await Product.getProductById(productId);
        const collection= await Db().collection(collectionName);
        if(!selectedProduct){
            return "Product with this id is not present";
        }
        if (!selectedProduct.userRatingMapping) {
            selectedProduct.userRatingMapping = {};
        }
        const existingRating=selectedProduct.userRatingMapping[userId];
        
        if(!existingRating){
            selectedProduct.rating=(selectedProduct.rating*selectedProduct.userRatingCount+rating)/selectedProduct.userRatingCount;
            selectedProduct.userRatingCount++;
        }
        else{
            selectedProduct.rating=(selectedProduct.rating*selectedProduct.userRatingCount-existingRating+rating)/selectedProduct.userRatingCount;
        }
       selectedProduct.userRatingMapping[userId]=(rating); 
       await collection.updateOne(
        { _id: new ObjectId(productId) },   // Filter by product ID
        { $set: {                           // Set updated values
            rating: selectedProduct.rating,
            userRatingCount: selectedProduct.userRatingCount,
            userRatingMapping: selectedProduct.userRatingMapping
        }}
    );
       return  selectedProduct ;
    }
}