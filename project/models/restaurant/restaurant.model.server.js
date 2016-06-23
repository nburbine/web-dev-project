module.exports = function () {

    var RestaurantSchema = require("./restaurant .schema.server.js")();
    var mongoose = require("mongoose");
    var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

    var api = {
        createRestaurant: createRestaurant,
        deleteRestaurant: deleteRestaurant,
        updateRestaurant: updateRestaurant,
        findAllRestaurants: findAllRestaurants,
        findRestaurantById: findRestaurantById
    };
    return api;

    function createRestaurant(restaurant) {
        return Restaurant.create(restaurant);
    }

    function deleteRestaurant(restaurantId) {
        return Restaurant.remove({_id: restaurantId});
    }

    function updateRestaurant(restaurantId, restaurant) {
        return Restaurant.update(
            {_id: restaurantId},
            {
                $set: {
                    name: restaurant.name,
                    description: restaurant.description
                }
            }
        );
    }

    function findAllRestaurants() {
        return Restaurant.find();
    }

    function findRestaurantById(restaurantId) {
        return Restaurant.findOne({_id: restaurantId});
    }
};