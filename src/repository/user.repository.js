import { Db } from "../routes/Db.js";
import { ObjectId } from "mongodb";
const collectionName="User";

class UserRepository{
    async creatUser(name,email,password,role){
        const userCollection= await Db().collection(collectionName);
        const user= {name,email,password,role};
        await userCollection.insertOne(user);
    }
    async getAllUser(){
       const userCollection= await Db().collection(collectionName);
       const users=await userCollection.find({}).toArray();
    //    console.log(users)
       return users;
    }
    
    async getUserByemail(email){
       const userCollection= await Db().collection(collectionName);
       const user= userCollection.findOne({email:email});
       return user;
    }
    async getUserById(id){
        const userCollection= await Db().collection(collectionName);
       const user=await userCollection.findOne({_id: new ObjectId(id)});
    //    console.log(user)
       return user;
    }

}
export default UserRepository;