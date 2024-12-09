const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.index = async (req,res)=>{
    const listings = await Listing.find({});
    res.render("listings/index.ejs",{listings});
}

module.exports.showListing = async(req,res,next)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
    }
    else{
        res.render("listings/listing.ejs",{listing});
    }
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.createListing = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;

    let newEntry = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file!=="undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        newEntry.image = {url, filename};
        await newEntry.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    if(listing.reviews){
        for(let review of listing.reviews){
             await Review.findByIdAndDelete(review.id);
        }
    }
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};