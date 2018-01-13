angular.module("myApp").service('myService', function($q, $http, $window) {
    /*
        @apicall():
        Fetch data from from data.json and return the respone.
    */
    this.apiCall = function() {
        return $http.get("data.json")
            .then(function(response) {
                return response;
            });
    }

    /*
        Save data in localstorage
    */
    this.setItems = function(data) {
        $window.localStorage.setItem('timetable', data)
    }

    /*
        Get data from localstorgae and return 
    */
    this.getItems = function() {
        const timetable = $window.localStorage.getItem('timetable') !== null ? $window.localStorage.getItem('timetable') : '';
        return timetable;
    }






    //teachDetails() fetch data from jSON file classDetails.json.
    this.teachDetails = function() {
        var defer1 = $q.defer();
        return $http.get("classDetails.json")
            .then(function(response) {
                return response;
            });

    }

    //set() is setting up the localStorage 
    this.setTech = function(data) {

        $window.localStorage.setItem('classDetails', JSON.stringify(data))
    }

    //get() gets the data and store in localStorage.
    this.getTech = function() {

        const classDetails = $window.localStorage.getItem('classDetails') !== null ? $window.localStorage.getItem('classDetails') : '';
        return JSON.parse(classDetails);
    }

});