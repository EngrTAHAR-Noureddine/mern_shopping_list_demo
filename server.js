const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

//DB config 
const db = require('./config/keys').mongoURI;

//connect to mongo 
mongoose.connect(db)
    .then(()=>console.log('mongo db connect'))
    .catch(err=>console.log(err));

const port = process.env.port || 5000;

app.listen(port,()=>console.log('server started on port : ',port));

