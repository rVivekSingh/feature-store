var express = require("express");
var app = express();
var port = 7000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Ness");
var nameSchema = new mongoose.Schema({
        feature_id : {
            type: String
        },
        feature_name : {
            type: String
        },
        feature_type : {
            type: String
        },
        feature_description : {
            type: String
        },
        feature_created_timestamp : {
            type: Date
        },
        feature_version : {
            type: String
        },
        feature_owner : {
            type: String
        },
        feature_data : {
            type: String
        }
    });
var Feature = mongoose.model("feature", nameSchema);

app.get("/", (req: any, res: any) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/features/feature", (req: any, res: any) => {    
    var myData = new Feature(req.body);
    console.log("request received=>" + req)
    console.log(myData);    
    myData.save()
        .then(item => {
            console.log(item);            
            res.send("Feature saved to database" + item);            
            res.end();
        })
        .catch(err => {
            console.log(err);            
            res.status(400).send("Unable to save to database");
            res.end();
        });
});
app.get("/api/features", (req:any, res:any)=>{
    console.log("request received")
    Feature.find({}).then(function (features) {
        res.send(features);
    });
});

app.put("/features/", (req:any, res:any)=>{
    var query = {'feature_id': req.user.username};
    req.newData.username = req.user.username;

    Feature.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
})