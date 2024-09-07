import bcrypt from "bcrypt";

export default class User{
    constructor(name,email,password,userId,role){
        this.userId=userId;
        this.name=name;
        this.email=email;
        this.password=password;
        this.role=role;
    }
    static creatUser(name,email,password,userId,role){
        const user=new User(name,email,password,userId,role);
        users.push(user);
    }
    static getAllUser(){
       return users;
    }
    
    static getUserByemail(email){
       const user= users.find((entry)=>{
            return entry.email == email;
        })
        return user;
    }
    static getUserById(id){

        const user = users.find((entry)=>{
            return entry.userId == id
        })
        return user;
    }
}
let users=[]