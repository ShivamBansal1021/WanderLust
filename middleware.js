const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema,editListing, reviewSchema} = require("./schema");

module.exports.validateNewListing = (req,res,next)=>{
    let listing = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    listing.listing.image = {url, filename};
    console.log(listing);
    let result = listingSchema.validate(listing);
    if(result.error){
        let errMsg = result.error.details.map((el)=>el.message).join(", ");
        throw new AppError(400, errMsg);
    }else{
        next();
    }
};

module.exports.validateEditListing = (req,res,next)=>{
    let result = editListing.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map((el)=>el.message).join(", ");
        throw new AppError(400,errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req,res,next)=>{
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(", ");
        throw new AppError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        //store redirectURl info in session
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","Login to create/edit a listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirect = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewOwner = async (req,res,next)=>{
    let { id, reviewId } = req.params;
    let listing = await Listing.findById(id);
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}