const mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1:27017/Ness';

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open',()=>{
  console.log(`DB Connection URL ${dbUrl}`);
});
db.on('error',(err:any)=>{
    console.log(err)
});

module.exports = db;