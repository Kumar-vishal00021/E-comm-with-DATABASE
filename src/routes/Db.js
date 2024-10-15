import { MongoClient } from "mongodb";
const dbName = 'e-comm-using-rest-api';
const url = 'mongodb+srv://Kumar-vishal00021:Vishal%401234@e-commerce.h5vsy.mongodb.net/';

let client;
export default function connectionToDb(){
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,  
        tlsAllowInvalidCertificates: true 
    })
    .then((currentClient)=>{
        client=currentClient;
        console.log("Db connected successfully");
    })
    .catch((err)=>{
        console.log(err);
        process.exit (1);
    })
}
export  function Db(){
    return client.db(dbName);
}