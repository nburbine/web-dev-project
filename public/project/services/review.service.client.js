(function () {
    angular
        .module("RestaurantApp")
        .factory("ReviewService", ReviewService);
    
    function ReviewService($http) {
        var api = {
            createReviewForUser: createReviewForUser,
            updateReview: updateReview,
            deleteReview: deleteReview,
            findAllReviewsForUser: findAllReviewsForUser,
            findReviewById: findReviewById,
            findAllReviewsByIds: findAllReviewsByIds,
            findAllReviewsForRestaurant: findAllReviewsForRestaurant,
            alreadyReviewed: alreadyReviewed
        };
        return api;

        function alreadyReviewed(userId, restaurantId) {
            var url = "/projectApi/review/check";
            return $http.post(url, {userId: userId, restaurantId: restaurantId});
        }
        
        function findAllReviewsForRestaurant(restaurantId) {
            var url = "/projectApi/review/restaurant/"+restaurantId;
            return $http.get(url);
        }
        
        function findAllReviewsByIds(reviewIds) {
            var url = "/projectApi/review";
            return $http.get(url, reviewIds);
        }
        
        function findReviewById(reviewId) {
            var url = "/projectApi/review/"+reviewId;
            return $http.get(url);
        }
        
        function findAllReviewsForUser(userId) {
            var url = "/projectApi/user/"+userId+"/review";
            return $http.get(url);
        }
        
        function deleteReview(reviewId) {
            var url = "/projectApi/review/"+reviewId;
            return $http.delete(url);
        }
        
        function updateReview(reviewId, review) {
            var url = "/projectApi/review/"+reviewId;
            return $http.put(url, review);
        }
        
        function createReviewForUser(userId, review) {
            var url = "/projectApi/user/"+userId+"/review";
            return $http.post(url, review);
        }
    }
})();