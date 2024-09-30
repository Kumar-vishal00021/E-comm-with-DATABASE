import { MongoClient } from "mongodb";
const dbName = 'e-comm-using-rest-api';
const url = 'mongodb://localhost:27017';

let client;
export default function connectionToDb(){
    MongoClient.connect(url)
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