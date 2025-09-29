const fs = require('fs')
function logReqRes(fileaName){
    return (req, res, next)=>{
        fileaName, 
        `\n${Date.now()}:${req.ip} ${req.method}:${req.path}\n` ,
        (err, data)=>{
            next();
        }
    }
}
module.exports={logReqRes}