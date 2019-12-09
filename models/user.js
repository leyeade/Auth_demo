let mongoose                   = require('mongoose');
let passportLocalMongoose      =require('passport-local-mongoose');

let Userschema= new mongoose.Schema({
    username:String,
    password:String,
});

Userschema.plugin(passportLocalMongoose);

module.exports=mongoose.model("user" , Userschema); 