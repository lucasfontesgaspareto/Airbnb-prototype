airbnbApp.controller('controllerBecomeHostStep3',function($scope,$state,$log,$http,$state){


    $scope.secondstep = $state.params.secondstep;
    $scope.price = "";
    $scope.currency = "";
    $scope.bidding = "";
    
    $scope.becomeHost = function(){
        $state.go('home.becomeHost')
    }


    $scope.becomeHostDates = function () {
        $scope.secondstep.price = $scope.price;
        $scope.secondstep.currency = $scope.currency;
        $scope.secondstep.biddingavailable = $scope.bidding;
        $state.go('home.becomeHostDates', {pricestep : $scope.secondstep});
    };

})