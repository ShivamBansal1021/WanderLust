const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.newReview = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req,res)=>{
    let {id, reviewId} = req.params;
    let listing = await Listing.findById(id);
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    req.flash("success","Review deleted successfully");
    res.redirect(`/listings/${id}`);
}