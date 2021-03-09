const FeatureSchema = new mongoose.Schema({
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
        type: Date,
        default: Date.now
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


module.exports = mongoose.model('Feature', FeatureSchema);