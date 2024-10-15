import { MongoClient } from "mongodb";
const dbName = 'e-comm-using-rest-api';
const url = 'mongodb+srv://Kumar-vishal00021:Vishal@1234@e-commerce.h5vsy.mongodb.net/?ssl=true&tls=true';

let client;
export default async function connectionToDb(){
    try {
        client = await MongoClient.connect(url, {
            tls: true, // Use TLS for connection
            tlsInsecure: true, // Allows connection even with self-signed certificates
            tlsAllowInvalidCertificates: true, // Allows invalid certificates (only for development)
            useUnifiedTopology: true, // Ensures MongoDB driver manages connections efficiently
            connectTimeoutMS: 10000 // Time out after 10 seconds
        });
        console.log("Db connected successfully");
    } catch (err) {
        console.error("Connection error: ", err);
        process.exit(1);
    }
}
export  function Db(){
    return client.db(dbName);
}