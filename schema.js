const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            url:Joi.string().required(),
            filename:Joi.string().required()
        }).required(),
        price: Joi.number().min(0),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

module.exports.editListing = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).default(1).required(),
        comment: Joi.string().required(),
    }).required()
})