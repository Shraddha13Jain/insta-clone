require('dotenv').config();

const express = require('express')
const app = express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
//const PORT = 3000;
mongoose.set('useFindAndModify', false);

//const {MONGOURL} = require('./keys');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
 }).then(()=>{
    console.log("DB is connected");
 })
 .catch((err)=>{
     console.log(err);
     process.exit();
 }) 


require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


const port=process.env.PORT || 3000;
app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`post is live at ${port}`);
});
