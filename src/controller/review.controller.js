const reviewSerivce = require('../services/review.service');

const createReview = async (req,res) => {

    const user = req.user;
    try {
        const review= await reviewService.createReview(req.body,user);
        return res.status(201).send(review);
    }
    catch(error) {
        return res.status(500).send({error:error.message});
    }
}


const getAllReviews = async (req,res) => {

    const user = req.user;
    const productId = req.params.productId;
    try {
        const reviews= await reviewService.getAllReview(productId);
        return res.status(201).send(reviereviewsw);
    }
    catch(error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports = {
    createReview,
    getAllReviews
}