import { MongoClient } from "mongodb";
const dbName = 'e-comm-using-rest-api';
const url = 'mongodb+srv://Kumar-vishal00021:Vishal%401234@e-commerce.h5vsy.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce';

let client;
export default async function connectionToDb(){
    try {
        client =await  MongoClient.connect(url);
        console.log("Db connected successfully");
    } catch (err) {
        console.error("Connection error: ", err);
        process.exit(1);
    }
}
export  function Db(){
    return  client.db(dbName);
}