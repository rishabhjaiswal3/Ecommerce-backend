const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },

},{timestamps:true})


const review = mongoose.model('reviews',reviewSchema);

module.exports = review;