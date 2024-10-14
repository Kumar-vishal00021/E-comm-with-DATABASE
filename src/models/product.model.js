



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
   
}