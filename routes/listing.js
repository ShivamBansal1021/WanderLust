const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const Review = require("../models/review");
const {isLoggedIn, isOwner, validateNewListing, validateEditListing} = require("../middleware.js");
const {index, showListing, renderNewForm, createListing, renderEditListing, editListing, destroyListing} = require("../controllers/listing.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(index))
    .post(isLoggedIn,upload.single('listing[image]'),validateNewListing,wrapAsync(createListing));

router.get("/new",isLoggedIn,renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(showListing))
    .patch(isLoggedIn,isOwner,upload.single('listing[image]'),validateEditListing,wrapAsync(editListing));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(renderEditListing));

router.delete("/:id/delete",isLoggedIn,isOwner,wrapAsync(destroyListing));

module.exports = router;