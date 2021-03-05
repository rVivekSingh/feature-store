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
export class MongoRepo{

    saveFeature(reqBody){
        var myData = new Feature(reqBody);
        console.log("request received=>" + reqBody)
        console.log(myData);  
        myData.save()
        .then(item => {
            console.log(item);            
            return "Feature Saved to DB"
        })
        .catch(err => {
            console.log(err);            
            return "Error " + err;
        });
    }
}