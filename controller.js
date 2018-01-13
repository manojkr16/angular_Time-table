angular.module("myApp").controller("myCtrl", function($scope, myService) {

    /* pageload function get respose of data from localstorage.
     */
    pageload = function() {


        // Get data from localstorage service
        const timetable = myService.getItems();

        // If data is not null or empty
        if (timetable) {
            $scope.dataLists = JSON.parse(timetable);

        } else {

            /*
                If data is null or empty
                Get data from API if Data not in local storage
            */
            myService.apiCall().then(function(response) {
                $scope.dataLists = response.data;

                // Save data in localstorage service
                myService.setItems(JSON.stringify(response.data));


            });
        }



    }



    pageload();



});

angular.module("myApp").controller("detailsController", function($scope, myService, $routeParams) {


    $scope.editText = 'Edit';
    $scope.SubmitText = 'Submit';



    /*
    @subDetails() get data from localstorge 
    @params TeacherCookie is data of classDetails.json. 
    */

    $scope.subDetails = function() {
        const teacherCookie = myService.getTech();

        if (!teacherCookie) { //if teacherCookie is not true

            myService.teachDetails().then(function(response) {


                    $scope.details = response.data;
                    /*
                    if subject is not undefiend than get subject from response.data.
                
                    */
                    if ($scope.details[$routeParams.subject] !== undefined) {
                        $scope.data = $scope.details[$routeParams.subject];
                    }


                }


            );
        } else {
            // else get the data subject from 
            $scope.data = teacherCookie[$routeParams.subject];
            $scope.details = teacherCookie;
        }

    }



    //add() can add new details of teacher ,timing and details 
    $scope.add = function() {
            $scope.isAdd = !$scope.isAdd;

        }
        // edit() edit and value of the teacherCookie
    $scope.edit = function() {

        $scope.isEdit = !$scope.isEdit;

        $scope.isSubmit = true;
        if ($scope.isEdit) {
            $scope.editText = 'Cancel';
        } else {

            $scope.editText = 'Edit';
        }

    }




    // submit() edit and update the value when sumit button is clicked.
    $scope.Submit = function(data) {

        $scope.details[$routeParams.subject] = data;


        myService.setTech($scope.details);
        if ($scope.isEdit) {
            $scope.editText = 'Edit';
            $scope.isEdit = false; // this concep need to discuss.


        } else {

            $scope.SubmitText = 'Submit';
        }


    }

    $scope.subDetails();

});