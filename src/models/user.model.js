import bcrypt from "bcrypt";
import {Db} from "../routes/Db.js";

export default class User{
    constructor(name,email,password,role){
        this.name=name;
        this.email=email;
        this.password=password;
        this.role=role;
    }
}
