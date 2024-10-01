const mongoose = require("mongoose");
const { type } = require("os");

const schema = mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortenUrl:{
        type:String,
        required:true
    },
    creationTime: {
        type: Date,
        default: Date.now
    }    
});

const Url = mongoose.model("shortendData",schema);

module.exports = Url;