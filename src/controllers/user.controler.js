import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
const SECRET_KEY="this is secret key";
const roleEnums = ['customer', 'seller', 'logistics']
//sign up for new user
async function  signup(req,res){
    const {name,email,password,role}=req.body;
    // const userId=uuidv4();
    if(!name || !email || !password || !role){
        return res.status(400).json({
            status:false,
            error:"couldn't register user",
            message:"required fields are not present"
        });
    }
    if(!roleEnums.includes(role)){
        return res.status(400).json({status: false, message: 'could not register user', error: 'role is not correct'})
    }
    const hashedPassword=bcrypt.hashSync(password,10);
    await User.creatUser(name,email,hashedPassword,role);
    return res.status(200).json({
        status:true,
        message:"User signed up successfully"
    });
}
//sign in to signed up user
async function signin(req,res){
   const {email,password}=req.body;
   if(!email || !password){
    return res.status(400).json({
        status:false,
        error:"Can't signin ",
        message:"either Email or password is missing"});
   }
   const user = await User.getUserByemail(email);
   if(!user){
    return res.status(400).json({
        status:false,
        error:"User can't signin",
        message:"User with this email is not present"
    })
   }

   const hashedPassword=user.password;
//    console.log(user.password)
   const isValidated=await bcrypt.compare(password,hashedPassword);
   if(!isValidated){
    return res.status(400).json({
        status:false,
        error:"User can't signin",
        message:"either Email or Password is wrong"
    })
   }
   const token=await jwt.sign({id:user._id,email:user.email,role:user.role},SECRET_KEY);
   const cookieOptions = {
     httpOnly: true
   }
   // if(process.env.NODE_ENV === 'PRODUCTION') cookieOptions.secure = true
   res.cookie('jwt', token)
   const userCopy={...user,token};
   return res.status(200).json({
    status:true,
    message:"Signed in successefully",
    user:userCopy
   });
}
//return all user who signed up
async function  getAllUsers(req,res){
    const user=await User.getAllUser();
    return res.status(200).json({
        "success":true,
        users:user
    });
}

export{signup,signin,getAllUsers};