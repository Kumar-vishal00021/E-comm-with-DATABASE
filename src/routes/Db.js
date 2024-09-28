import { MongoClient } from "mongodb";
const dbName = 'e-comm-using-rest-api';
const url = 'mongodb://localhost:27017';

export default function connectionToDb(){
    MongoClient.connect(url)
    .then(()=>{
        console.log("Db connected successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
}