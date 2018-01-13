angular.module("myApp").config(function($routeProvider) {
    $routeProvider
        .when("/manoj", {
            templateUrl: './templates/list.html',
            controller: "myCtrl"
        })
        .when("/details/:subject", {
            templateUrl: './templates/details.html',
            controller: "detailsController"
        })
        .when("/add/:subject", {
            templateUrl: './templates/add.html',
            controller: "detailsController"
        })

    .otherwise({
        redirectTo: "/manoj"
    })

});