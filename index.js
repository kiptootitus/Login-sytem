const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const passportLocalMongoose = require("passport-local-mongoose");
const passport  =  require("passport");
const User  =  require("./models/user");

const port = process.env.PORT || 4000;
passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
//      R O U T E S

app.get("/", (req,res) =>{
    res.render("home");
})
app.get("/userprofile" ,(req,res) =>{
    res.render("userprofile");
})
//Auth Routes
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    phone:Number,
    telephone:Number
}) ;
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);





async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://archy:archy123@arcade.te1xd84.mongodb.net/Archy?retryWrites=true&w=majority";


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
if(client.connect()){
    console.log("Connected to database");
}
else {
    console.log("Not connected to database");};
        // Make the appropriate DB calls
        const collection = client.db("Archy").collection("Users");

    } catch (e) {
        console.error(e);
    } 
}

main().catch(console.error);
app.use(require("express-session")({
    secret:"Any normal Word",//decode or encode session
        resave: false,          
        saveUninitialized:false    
    }));
console.log( "Server running on port " + port )