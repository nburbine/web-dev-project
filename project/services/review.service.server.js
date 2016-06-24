module.exports = function (app, models) {
    var reviewModel = models.reviewModel;
    
    app.get("/projectApi/user/:uid/review", findAllReviewsForUser);
    app.get("/projectApi/review/:rid", findReviewById);
    app.post("/projectApi/user/:uid/review", createReviewForUser);
    app.put("/projectApi/review/:rid", updateReview);
    app.delete("/projectApi/review/:rid", deleteReview);
    
    function deleteReview(req, res) {
        var reviewId = req.params.rid;
        reviewModel
            .deleteReview(reviewId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to delete review with ID: "+reviewId);
                }
            )
    }
    
    function updateReview(req, res) {
        var reviewId = req.params.rid;
        var newReview = req.body;
        reviewModel
            .updateReview(reviewId, newReview)
            .then(
                function (review) {
                    res.send(review);
                },
                function (error) {
                    res.status(404).send("Unable to update review with ID: "+reviewId);
                }
            )
    }
    
    function createReviewForUser(req, res) {
        var newReview = req.body;
        var userId = req.params.uid;
        reviewModel
            .createReviewForUser(userId, newReview)
            .then(
                function (review) {
                    res.send(review);
                },
                function (error) {
                    res.status(400).send("Unable to create review");
                }
            )
    }
    
    function findReviewById(req, res) {
        var reviewId = req.params.rid;
        reviewModel
            .findReviewById(reviewId)
            .then(
                function (review) {
                    res.send(review)
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }
    
    function findAllReviewsForUser(req, res) {
        var userId = req.params.uid;        
        reviewModel
            .findAllReviewsForUser(userId)
            .then(
                function (reviews) {
                    res.send(reviews);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
};