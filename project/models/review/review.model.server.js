module.exports = function () {

    var ReviewSchema = require("./review .schema.server.js")();
    var mongoose = require("mongoose");
    var Review = mongoose.model("Review", ReviewSchema);

    var api = {
        createReviewForUser: createReviewForUser,
        deleteReview: deleteReview,
        updateReview: updateReview,
        findAllReviewsForUser: findAllReviewsForUser,
        findReviewById: findReviewById
    };
    return api;

    function createReviewForUser(userId, review) {
        review._user = userId;
        return Review.create(review);
    }

    function deleteReview(reviewId) {
        return Review.remove({_id: reviewId});
    }

    function updateReview(reviewId, review) {
        return Review.update(
            {_id: reviewId},
            {
                $set: {
                    name: review.name,
                    description: review.description
                }
            }
        );
    }

    function findAllReviewsForUser(userId) {
        return Review.find({_user: userId});
    }

    function findReviewById(reviewId) {
        return Review.findOne({_id: reviewId});
    }
};