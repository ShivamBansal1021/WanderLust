const User = require("../models/user");

module.exports.renderSignUp = (req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{
    try{
        let {username, email, password} = req.body.user;
        const newUser = new User({email, username});
        await User.register(newUser,password);
        //to automatically login after signup
        req.login(newUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","User Registerd Successfully");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin = (req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    });
};

