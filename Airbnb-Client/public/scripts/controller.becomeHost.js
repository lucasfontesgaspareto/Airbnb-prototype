/**
 * Created by Shruti Loya on 11/17/2016.
 */
/**
 * Created by Shruti Loya on 11/17/2016.
 */

airbnbApp.controller('controllerBecomeHost',function($scope,$state,$log,$http,$state,$window){


    $scope.firststepdet = $state.params.firstStep;
    $scope.secondstep = $state.params.secondstep;
    $scope.laststp = $state.params.laststep;
    $scope.booking =$state.params.bookings;

    if($scope.firststepdet == null && $scope.secondstep == null && !$scope.laststp)
    {
        $scope.step1 = true;
        $scope.step1complete=false;
        $scope.step2complete=false;
        $scope.step2 = false;
        $scope.step3 = false;
    }
    else if($scope.firststepdet != null && $scope.secondstep == null)
    {
        $scope.step1 = false;
        $scope.step1complete=true;
        $scope.step2complete=false;
        $scope.step2 = true;
        $scope.step3 = false;
    }
    else if($scope.firststepdet == null && $scope.secondstep != null)
    {
        $scope.step1 = false;
        $scope.step1complete=true;
        $scope.step2complete=true;
        $scope.step2 = false;
        $scope.step3 = true;
    }
    else if($scope.laststp)
    {
        $scope.step1complete=true;
        $scope.step2complete=true;
    }


    $scope.startHosting1 = function () {
        $state.go('home.becomeHostStep1');
    };


    $scope.startHosting2 = function ()
    {

        $state.go('home.becomeHostStep2',{firstStep : $scope.firststepdet});
    };



    $scope.startHosting3 = function () {
        $state.go('home.becomeHostStep3',{secondstep : $scope.secondstep});
    };


    $scope.total =$state.params.bookings.price + 300;
    $scope.nights =moment($state.params.bookings.till_date).diff(moment($state.params.bookings.from_date),'days');

    $scope.saveReview =function (uname)
    {
        $http({
            method : "POST",
            url : '/host/userReview',
            data : {
                rating : $window.rating,
                username : uname,
                reviewPost : $scope.reviewPost
            }
        }).success(function(data){

              console.log(data);
            $state.go('home.profile.history');

        }).error(function(error) {
            console.log("error");
        });

    }


})
