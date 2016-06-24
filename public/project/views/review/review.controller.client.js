(function () {
    angular
        .module("RestaurantApp")
        .controller("ReviewListController", ReviewListController)
        .controller("NewReviewController", NewReviewController)
        .controller("EditReviewController", EditReviewController);
    
    function ReviewListController($routeParams, ReviewService) {
        var vm = this;

        // var restaurants = [{
        //     restaurantsname: "foodhouse1",
        //     discription: "place3Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See t",
        //     review: "I hate this one "
        // },
        //     {
        //         restaurantsname: "foodhouse2",
        //         discription: "good place3Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See the detailed description on Franz Josef restaurant or the Café-bar for ...",
        //         review: "I love this one "
        //     },
        //
        //
        //     {
        //         restaurantsname: "foodhouse2",
        //         discription: "good place3 Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See the detailed description on Franz Josef restaurant or the Café-bar for ...",
        //         review: "I hate this one too"
        //     }];


        vm.userId = $routeParams['id'];
        function init() {
            ReviewService
                .findAllReviewsForUser(vm.userId)
                .then(
                    function (response) {
                        vm.reviews = response.data;
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                )
        }
        init();

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
    
    function NewReviewController($routeParams, ReviewService, UserService) {
        var vm = this;

        vm.createReview = createReview;

        vm.userId = $routeParams['uid'];

        vm.review = {
           rating: 0,
           review: ""
        };

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
                )
        }
        init();

        function createReview() {
            console.log(vm.review);
            ReviewService
                .createReviewForUser(vm.userId, vm.review)
                .then(
                    function (response) {
                        vm.success = 'Created review';
                        console.log(response);
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                )
        }
    }
    
    function EditReviewController($routeParams, ReviewService) {
        var vm = this;
        
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        
        vm.userId = $routeParams['id'];
        vm.reviewId = $routeParams['rid'];
        
        function init() {
            ReviewService
                .findReviewById(vm.reviewId)
                .then(
                    function (response) {
                        vm.review = response.data;
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                )
        }
        init();
        
        function updateReview() {
            ReviewService
                .updateReview(vm.reviewId, vm.review)
                .then(
                    function (response) {
                        vm.success = "Changes Saved";
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