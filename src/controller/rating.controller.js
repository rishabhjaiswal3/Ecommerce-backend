const ratingSerivce = require('../services/rating.service');

const createrating = async (req,res) => {

    const user = req.user;
    try {
        const rating= await ratingService.createRating(req.body,user);
        return res.status(201).send(rating);
    }
    catch(error) {
        return res.status(500).send({error:error.message});
    }
}


const getAllRatings = async (req,res) => {

    const user = req.user;
    const productId = req.params.productId;
    try {
        const ratings= await ratingService.getAllrating(productId);
        return res.status(201).send(revieratingsw);
    }
    catch(error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports = {
    createRating,
    getAllRatings
}
