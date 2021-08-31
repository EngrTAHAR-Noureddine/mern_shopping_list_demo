const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');
const app = express();

// Body parser middleware
app.use(bodyParser.json());

//DB config 
const db = require('./config/keys').mongoURI;

//connect to mongo 
mongoose.connect(db)
    .then(()=>console.log('mongo db connect'))
    .catch(err=>console.log(err));

app.use('/api/items',items);
// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


const port = process.env.port || 5000;

app.listen(port,()=>console.log('server started on port : ',port));

