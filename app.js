const express = require('express')
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const {MONGOURL} = require('./keys');


mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log("DB connected");
})
mongoose.connection.on('error',()=>{
    console.log('error connecting DB',err);
})


require('./modelS/user');
require('./modelS/post');

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


app.listen(PORT,()=>{
    console.log("serever is running on ",PORT);
})