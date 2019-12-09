let express               =require('express'),
    bodyParser            =require('body-parser'),
    mongoose              =require('mongoose'),
    User                  =require('./models/user'),
    passport              =require('passport'),
    localStrategy         =require('passport-local'),
    passportLocalMongoose =require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/Auth_demo_app" , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
});

 let app=express();

app.use(require('express-session')({
    secret:"This is the login route",
    resave:false,
    saveUninitialized:false

}));

app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(passport. initialize());
app.use(passport.session());
passport.use("local", new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

//==========
//ROUTES
//===========
// show registration form
app.get("/register" , function(req , res){
    res.render("register")
})
// homepage

app.get("/" , function(req , res){
    res.render("homepage");
});

// secret page
app.get("/secret"  ,function(req , res){
    res.render("secret")
});

// handling the user sign up
app.post("/register" , function(req , res){
    req.body.Username
    req.body.password
    User.register(new User({username:req.body.Username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
           return res.render("register")
        }
        passport.authenticate("local")(req , res, function(){
            console.log(user)
            res.render("secret");
        });
    });

});

//login form
//render login form
app.get("/login", function(req , res){
    res.render("login")
});


//login logic for login
app.post("/login" , passport.authenticate("local"  , {
    failureRedirect: '/login',
    successRedirect:"/secret"
}), function(){
});


         


// // logout form
// app.get("/logout" , function (req , res){
//     req.logout();
//     res.redirect("/")
// });


//  let isLoggedin= function(req , res, next){
//      if(req.isAuthenticated()){
//      return next(); 
//      }
//      res.redirect("/login")
// }
     





app.listen(3000, process.env.IP, function(){
    console.log("Auth has started!!!");
});