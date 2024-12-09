if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");


methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate);

const listings = require("./routes/listing");
const reviews = require("./routes/review");
const user = require("./routes/user");
const { createSecretKey } = require("crypto");

const dbUrl = process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000
    },
    httpOnly: true
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("",user);

app.all("*",(req,res)=>{
    res.render("error/err404.ejs");
});

app.use((err,req,res,next)=>{
    let {status=500,message} = err;
    res.status(status).render("error/error.ejs",{status,message});
});

app.listen(3300,()=>{
    console.log("app is listening to port 3300");
});