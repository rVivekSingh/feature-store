const express = require('express');
require('./db/dbcon');
const port = 7000;

const app = express();

const featureRoute = require('./controller/featureController');

app.use(express.json())

app.use('/api/features',featureRoute);

app.listen(port,()=>{
    console.log(`App started on port :${port}`);
})

