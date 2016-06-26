(function () {
    angular
        .module("RestaurantApp")
        .controller("ReviewListController", ReviewListController)
        .controller("NewReviewController", NewReviewController)
        .controller("EditReviewController", EditReviewController);
    
    function ReviewListController($routeParams, ReviewService, RestaurantService, $timeout) {
        var vm = this;

        vm.userId = $routeParams['id'];

        function init() {
            vm.reviews = [];
            ReviewService
                .findAllReviewsForUser(vm.userId)
                .then(
                    function (response) {
                        var reviews = response.data;
                        vm.reviews = reviews;
                        var restaurantIds = [];
                        for (var i in reviews) {
                            restaurantIds.push(reviews[i]._restaurant);
                        }
                        return [reviews, restaurantIds];
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                // )
                // .then(
                //     function (values) {
                //         var reviews = values[0];
                //         var restaurantIds = values[1];
                //         for (var i in restaurantIds) {
                //             RestaurantService
                //                 .findRestaurantById(restaurantIds[i])
                //                 .then(
                //                     function (response) {
                //                         var restaurant = response.data;
                //                         reviews[i].restaurant = restaurant;
                //                         return reviews[i];
                //                     }
                //                 )
                //         }
                //     }
                // )
                // .then(
                //     function (review) {
                //         vm.reviews.push(review);
                //     }
                )
        }
        init();


        // for (var i in reviews) {
        //     RestaurantService
        //         .findRestaurantById(reviews[i]._restaurant)
        //         .then(
        //             function (response) {
        //                 var restaurant = response.data;
        //                 console.log(restaurant.name);
        //                 reviews[i].restaurant = restaurant.name;
        //             }
        //         )
        // }

        function addReview() {
            var review = {
                _user: vm.userId,
                rate: 3,
                review: "Average",
                _restaurant: "576c7347acc6a5881e938847"
            };
            ReviewService
                .createReviewForUser(vm.userId, review);
        }
        //addReview();
    }
    
    function NewReviewController($routeParams, ReviewService, UserService, RestaurantService) {
        var vm = this;

        vm.createReview = createReview;

        vm.restaurantId = $routeParams['rid'];
        vm.userId = $routeParams['uid'];

        vm.review = {
            _restaurant: vm.restaurantId,

        };

        function init() {
            RestaurantService
                .findRestaurantById(vm.restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                )
        }
        init();

        function createReview() {
            var stars = document.getElementsByName('star');
            for (var i in stars) {
                if (stars[i].checked) {
                    vm.review.rate = parseInt(stars[i].value);
                }
            }

            var review = document.getElementsByName('review').value;
            if (review) {
                vm.review.review = review;
            }

            if (! (1<=vm.review.rate && vm.review.rate<=5)) {
                vm.alert = 'Please enter rating'
            } else {
                ReviewService
                    .createReviewForUser(vm.userId, vm.review)
                    .then(
                        function (response) {
                            window.location = '#/restaurant/'+vm.restaurantId;
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    )
            }
        }
    }
    
    function EditReviewController($routeParams, ReviewService, RestaurantService, UserService) {
        var vm = this;
        
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        
        vm.userId = $routeParams['id'];
        vm.reviewId = $routeParams['rid'];
        
        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
            ReviewService
                .findReviewById(vm.reviewId)
                .then(
                    function (response) {
                        vm.review = response.data;
                        var stars = document.getElementsByName('star');
                        for (var i in stars) {
                            if (parseInt(stars[i].value) === vm.review.rate) {
                                stars[i].checked = true;
                            }
                        }
                        return vm.review._restaurant;
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                )
                .then(
                    function (restaurantId) {
                        RestaurantService
                            .findRestaurantById(restaurantId)
                            .then(
                                function (response) {
                                    vm.restaurant = response.data;
                                }
                            )
                    }
                )
        }
        init();
        
        function updateReview() {
            var stars = document.getElementsByName('star');
            for (var i in stars) {
                if (stars[i].checked) {
                    vm.review.rate = parseInt(stars[i].value);
                }
            }
            ReviewService
                .updateReview(vm.reviewId, vm.review)
                .then(
                    function (response) {
                        vm.success = "Changes Saved";
                        console.log(response);
                        window.location = '#/user/'+vm.userId+'/review';
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                )
        }
        
        function deleteReview() {
            ReviewService
                .deleteReview(vm.reviewId)
                .then(
                    function (response) {
                        console.log(response);
                    },
                    function (error) {
                        vm.alert = error;
                    }
                );
        }
    }
})();