const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const Listing=require("./models/listing.js")
// const Review =require("./models/review.js")
const path=require("path")
const methodoverride=require("method-override")
const ejs_mate=require("ejs-mate")
// const wrapAsync=require("./utils/wrapasync.js")
const expressError=require("./utils/expressError.js")
// const {listing_schema,reviewSchema}=require("./schema.js")
const listings=require("./routes/listings.js");
const reviews=require("./routes/reviews.js");
const signup=require("./routes/signup.js");
const session=require("express-session");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const flash=require("connect-flash")




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}))
app.use(methodoverride("_method"));
app.engine('ejs', ejs_mate);
app.use(express.static(path.join(__dirname,"/public")))

async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    
}
main().then(res=>{
    console.log("connected to db")
})
.catch(err=>{
    console.log(err)
})




const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxage: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,

    },
}


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







//home route

app.get("/",(req,res)=>{
    res.send("home page")
})
//demo user
app.get("/demouser",async(req,res)=>{
    let fakeUser=new User({
        email:"fake@gmail.com",
        username:"delta-student"
    });
  let registeredUser= await  User.register(fakeUser,"helloworld");
  res.send(registeredUser);
})

app.use("/Listings",listings);
app.use("/Listings/:id/reviews",reviews);
app.use("/",signup);





//testing
// app.get("/Listing_testing",async(req,res)=>{
//    let samplelisting= new Listing({
//     Title:"My New Villa",
//     description:"BY the Beach",
//     price:1200,
//     location:"Goa",
//     country:"India"
//    });

// await samplelisting.save();
// console.log("sample was saved");
// res.send("successful Listing")
// })

app.all("/{*splat}",(req,res,next)=>{
    next(new expressError(404,"page not found"))
})

app.use((err,req,res,next)=>{
    let{statusCode,message}=err;
    res.render("error.ejs",{message})
    // res.status(statusCode).send(message);
})

app.listen(8080,()=>{
    console.log("app is listeing")
})