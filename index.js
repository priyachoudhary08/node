const express = require('express');
const userRouter = require('./routes/user');
const {connectMongoDb} = require('./connection') ;
const { logReqRes }= require('./middlewares')
const app = express();
PORT = 8000;


// Connection 
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>console.log('Mongo DB started '));

//MIDDLEWARE - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'))

// routes 
app.use('/api/users' , userRouter);

app.listen(PORT, () => {
    console.log(`Server Started at port : ${PORT}`);

})
