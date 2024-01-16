const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const articleRouter = require('./routes/articleRoutes')
const categoryRouter = require('./routes/categoryRoutes')


const app = express();


app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose
    .connect(
        "mongodb+srv://root:root@cluster0.9ei6p.mongodb.net/BlogAPI?retryWrites=true&w=majority"
    )
    .then((result) => {
        console.log("Data base connnected");

     
        app.use("/artical", articleRouter);
        app.use('/category' ,categoryRouter)
       
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log("-----------SERVER IS STARTED-----------" ,port);
});