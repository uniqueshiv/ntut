const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


require('dotenv/config');
app.use(cors());
app.options('*',cors());


const api = process.env.API_URL;
const port = 3000

//Middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));


//Routes 
const productRouteres = require('./routers/products');
const userRouters = require('./routers/users');
const categoryRouters = require('./routers/categories');

app.use(`${api}/products`, productRouteres);
app.use(`${api}/category`,categoryRouters); 
app.use(`${api}/users`,userRouters);


//Database
mongoose.connect('mongodb+srv://shivachauhan:' + encodeURIComponent("") + '@cluster0.rhan5.mongodb.net/NodeTuts?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        dbName: 'NodeTuts',
        useCreateIndex: true
    })
    .then(() => {   
        console.log("database connection established");
    })  
    .catch((err) => {
        console.log(err);
    })

// Server 
app.listen(port, () => {
    console.log("servre is runing on " + port)
})
