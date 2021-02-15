const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Member = new Schema({
    username : String,
    password : String
},{
    versionKey : false
});

module.exports = mongoose.model('Member',Member);