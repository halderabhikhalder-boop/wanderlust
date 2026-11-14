const joi =require("joi");
module.exports.listing_schema= joi.object({
    listing : joi.object({
        Title : joi.string().required(),
        description : joi.string().required(),
        location : joi.string().required(),
        country : joi.string().required().min(0),
        price : joi.number().required(),
        

    }).required()
})

module.exports.reviewSchema= joi.object({
    review : joi.object({
        comment : joi.string().required(),
      
        rating : joi.number().required().min(1).max(5),
        

    }).required()
})