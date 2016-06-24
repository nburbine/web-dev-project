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
            findReviewById: findReviewById
        };
        return api;
        
        function findReviewById(reviewId) {
            var url = "/projectApi/review"+reviewId;
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