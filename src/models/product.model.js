
export default class Product{
    constructor(id,name,price,rating,description,quantity,creatorId,userRatingCount,userRatingMapping){
       this.id=id;
       this.name=name;
       this.price=price;
       this.rating=rating;
       this.description=description;
       this.quantity=quantity;
       this.creatorId=creatorId;
       this.userRatingCount=userRatingCount;
       this.userRatingMapping=userRatingMapping;
    }
    static getAllProduct(filters) {
        const filteredProduct=products.filter((entry)=>{
            return (
                ( 
                    (!filters.minPrice || entry.price >= parseInt(filters.minPrice)) && 
                    (!filters.maxPrice || entry.price <= parseInt(filters.maxPrice))
                )
            )
        })
        return filteredProduct;
    }
    static addProduct(id,name,price,description,quantity){
       const newProduct=new Product(id,name,price,0,description,quantity,911,0);
       products.push(newProduct);
    }
    static getProductById(id){
        const filteredProduct=products.find((entry)=>{
            return entry.id == id;
        })
        return filteredProduct;
    }
    static addProductRating(productId,userId,rating){
        const selectedProduct=Product.getProductById(productId);
        if(!selectedProduct){
            return "Product with this id is not present";
        }
        const existingRating=selectedProduct.userRatingMapping[userId];
        if(!existingRating){
            selectedProduct.rating=(selectedProduct.rating*selectedProduct.userRatingCount+rating)/selectedProduct.userRatingCount;
            selectedProduct.userRatingCount++;
        }
        else{
            selectedProduct.rating=(selectedProduct.rating*selectedProduct.userRatingCount-existingRating+rating)/selectedProduct.userRatingCount;
        }
       selectedProduct.userRatingMapping[userId]=rating; 
       return { success: true };
    }
}

let products=[
    new Product("1",'laptop',120000,4.9,"this is the premium laptop for heavy use",1,9117446593,0,{}),
    new Product("2", 'mobile',53000,4.9,"this is the premium mobile for heavy use",1,911744659,0,{}),
    new Product("3", 'machine',15000,4.9,"this is the premium machine for heavy use",1,91174465,0,{}),
    new Product("4", 'dekstop',10000,4.9,"this is the premium dekstop for heavy use",1,9117446,0,{}),
]