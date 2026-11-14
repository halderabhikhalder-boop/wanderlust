const express=require("express");
const app=express();
const session=require("express-session")
const flash=require("connect-flash")
const path=require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions={
 secret:"mysupersecretsrting",
    resave:false,
    saveUninitialized:true
}


app.use(session(sessionOptions));
app.use(flash());

// app.get("/test-query", (req, res) => {
//     res.json({
//         url: req.originalUrl,
//         query: req.query
//     });
// });

app.get("/register",(req,res)=>{
    console.log("Query:",req.body);
    let{ name ="anonymous"}=req.query;
    console.log("Name received:",name);
    
    req.session.name = name;
    console.log(req.session.name);
    req.flash("success","user register successful")
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    // req.locals.message=req.flash("success");
    res.render("page.ejs",{name:req.session.name ,msg:req.flash("success")})
})


// app.get("/",(req,res)=>{
//     res.send("home")
// })

// app.get("/test",(req,res)=>{
//     res.send("test successful!!")
// })
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
    

//     res.send(`you entered request ${req.session.count} times`)
// })


app.listen(3000,()=>{
    console.log("server is listening to 3000");
})