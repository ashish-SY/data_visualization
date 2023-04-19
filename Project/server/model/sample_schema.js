const mongoose= require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const sample_schema =new mongoose.Schema({
    end_year:{
        type: String,
        required:true
    },
    intensity:{
        type:Number,
        required:true
    },
    sector:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    insight:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }, region:{
        type:String,
        required:true
    },start_year:{
        type:String,
        required:true
    }, impact:{
        type:String,
        required:true
    }, added:{
        type:String,
        required:true
    }, published:{
        type:String,
        required:true
    }, country:{
        type:String,
        required:true
    },
    relevance:{
        type:Number,
        required:true
    }, pestle:{
        type:String,
        required:true
    }, source:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }, likelihood:{
        type:Number,
        required:true
    },
});
 


// hashing the passoword


const Sample=mongoose.model('Samples',sample_schema);
module.exports=Sample;