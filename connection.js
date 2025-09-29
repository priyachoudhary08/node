const mongoose = require('mongoose');

async function connectMongoDb(url){
return mongoose.connect(url)
}

//connecting mongoose 
// mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
//     .then(() => {
//         console.log('Mongo DB Connected ')
//     }).catch(err => console.log('Mongo Error ', err)
//     )


module.exports = {connectMongoDb}
   