const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const passport = require("passport");
const {saveRedirect} = require("../middleware.js");
const { renderSignUp, signUp, renderLogin, login, logout } = require("../controllers/user.js");

router
    .route("/signup")
    .get(renderSignUp)
    .post(wrapAsync(signUp));

router
    .route("/login")
    .get(renderLogin)
    .post(saveRedirect,passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }),
    login);

router.get("/logout",logout);

module.exports = router;