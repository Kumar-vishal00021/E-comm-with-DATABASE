import fs from 'fs';
const fsPromise = fs.promises;
import * as url from 'url';
import path from 'path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const logger = async (body) => {
    try{
        const errMessage = new Date().toString() + " " +JSON.stringify(body);
        await fsPromise.appendFile(path.join(__dirname, "..", "..", "custom_logs.txt"), `\n${errMessage}`)
    }
    catch(err){
        console.log(err);
    }
}

const loggerMiddleware  = async (req, res, next) => {
    await logger(req.body);
    next();
}

export {logger,loggerMiddleware};