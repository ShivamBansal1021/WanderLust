const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const {listingSchema, editListing, reviewSchema} = require("../schema");
const Review = require("../models/review");
const {isLoggedIn, isReviewOwner, validateReview} = require("../middleware");
const { newReview, deleteReview } = require("../controllers/review");


//Review post route
router.post("/", isLoggedIn,validateReview, wrapAsync(newReview));

//Delete review
router.delete("/:reviewId",isLoggedIn,isReviewOwner,wrapAsync(deleteReview));

module.exports = router;