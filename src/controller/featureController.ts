const expressInstance = require('express');
const featureRouter = expressInstance.Router();
const Feature = require('../model/Feature');


featureRouter.get('/',async(req:any,res:any)=>{
    try {
        const features = await Feature.find();
        res.status(200).send(features)
    } catch(err) {
        res.status(400).send(err);
    } 
});


featureRouter.post('/feature',async(req:any,res:any)=>{
    const reqData = req.body;
    const feature = new Feature({
        feature_id: reqData.feature_id,
        feature_name: reqData.feature_name,
        feature_type: reqData.feature_type,
        feature_description: reqData.feature_description,
        feature_created_timestamp: reqData.feature_created_timestamp,
        feature_version: reqData.feature_version,
        feature_owner: reqData.feature_owner,
        feature_data: reqData.feature_data
    });

    try {
        const savedFeature = await feature.save();
        res.status(200).send(savedFeature);
    } catch(err) {
        res.status(400).send(err);
    }
});

featureRouter.patch('/:featureId',async(req:any,res:any)=>{
    const requestData = req.body;
    try {
        const feature = await Feature.updateOne(
            { _id:req.params.featureId},
            {$set:{
                feature_id: requestData.feature_id,
                feature_name: requestData.feature_name,
                feature_type: requestData.feature_type,
                feature_description: requestData.feature_description,
                feature_created_timestamp: requestData.feature_created_timestamp,
                feature_version: requestData.feature_version,
                feature_owner: requestData.feature_owner,
                feature_data: requestData.feature_data
            }}
            )
        res.status(200).send(feature)
    } catch(err) {
        res.status(400).send(err);
    } 
});

featureRouter.delete('/:featureId',async(req:any,res:any)=>{
    try{
        const feature = await Feature.findByIdAndRemove({_id:req.params.featureId});
        res.status(200).send(req.params.featureId + 'Feature is Deleted : '+ feature)
    } catch(err) {
        res.status(400).send(err);
    } 
})

featureRouter.get('/:featureId',async(req:any,res:any)=>{
    try {
        const feature = await Feature.findById(req.params.featureId);
        res.status(200).send(feature)
    } catch(err) {
        res.status(400).send(err);
    } 
});

module.exports = featureRouter;