import jwt from 'jsonwebtoken';

const authGeneric = (req, res) => {
    if(req.headers?.authorization?.split(' ')[1]){
        const token = req.headers?.authorization?.split(' ')[1];
        try{
            const decodedToken = jwt.verify(token, 'this is secret key'); //second thing is secret code
            return decodedToken;
        }
        catch(err){
            console.log(err)
            throw new Error("Unauthorized")
        }
    }
    else{
        throw new Error("Unauthorized")
    }
}
const auth = (req, res, next) => {
    try{
        const tokenData = authGeneric(req);
        req.user = tokenData;
        next();
    }
    catch(err){
        return res.status(401).json({status: false, error: err.message});
    }
}
const customerCheck = (req, res, next) => {
    try{
        const tokenData = authGeneric(req);
        req.user = tokenData;
        if(!tokenData.role || tokenData.role != 'customer'){
            return res.status(401).json({status: false, error: 'Unauthorized'});
        }
        next();
    }
    catch(err){
        return res.status(401).json({status: false, error: err.message});
    }
}

export {auth, customerCheck}