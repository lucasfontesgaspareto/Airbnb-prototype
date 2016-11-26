airbnbApp.controller('controllerProperties',function($scope,$http,$state,$stateParams){


  $scope.city = $state.params.city;
  $scope.noPropertiesFound = false;
  $scope.selectedProperty = $state.params.selectedProperty;

  $scope.property_min_price = 0;
  $scope.property_max_price = 0;

  $scope.startDateFilter = "";
  $scope.endDateFilter = "";

  $scope.typeOfProperty = "";

  $scope.prvRoom = true;
  $scope.shRoom = true;
  $scope.entRoom = true;

  $scope.guestsFilter = 1;

  
  $scope.propertyPriceRangeFilter = function(property) {
    return (parseInt(property['price']) >= $scope.property_min_price && parseInt(property['price']) <= $scope.property_max_price);
  };
  
  $scope.propertyDateRangeFilter = function(property){
    var startDate = new Date(property['from']);
    var endDate = new Date(property['till']);
    
    var checkin = "";
    var checkout = "";
    
    if($scope.startDateFilter != "")
      checkin = new Date($scope.startDateFilter);
     
    if($scope.endDateFilter != "")
      checkout = new Date($scope.endDateFilter);

    if(checkin == "" || checkout == "" )
      return true;
    else if(startDate <= checkin && endDate >= checkout)
      return true;
    else
      return false;
  }

  $scope.propertyTypeFilter = function(property){
    if(property['guestaccess'] == "entire_room" && $scope.entRoom == true)
      return property;
    if(property['guestaccess'] == "private_room" && $scope.prvRoom == true)
      return property;
    if(property['guestaccess'] == "shared_room" && $scope.shRoom == true)
      return property; 
  }

  $scope.propertyGuestsFilter = function(property){

    if(property['noofguests'] < $scope.guestsFilter)
      return false;
    else 
      return true;
  }

/*$scope.customMapFilter = function()
{

  /*if() conditions for date range
    {
       if()//condition for apartment type
       {
          if() //condition for price range
          {
            return property;
          }
       }
    } 

}*/
  /*
   |-----------------------------------------------------------
   | get properties in the given city
   |-----------------------------------------------------------
  */
  $http({
    method : "POST",
    url : '/properties',
    data : {
      city: $scope.city,
      page: 1
    }
  }).success(function(data) {
    if(data.statuscode == 0)
    {
      $scope.properties = data.data;
      $scope.property_max_price = Math.max.apply(Math,$scope.properties.map(function(property){return property.price;}));
      $scope.property_min_price = Math.min.apply(Math,$scope.properties.map(function(property){return property.price;}));
      console.log($scope.properties);
    }
    else
    {
      $scope.noPropertiesFound = true;
    }
  }).error(function(error) {
      console.log("Internal Server error occurred");
  });




  $scope.pageChanged = function(page){
    $http({
      method : "POST",
      url : '/properties',
      data : {
        city: $scope.city,
        page: page
      }
    }).success(function(data) {
      if(data.statuscode == 0)
      {
        $scope.properties = data.data;
        $scope.property_max_price = Math.max.apply(Math,$scope.properties.map(function(property){return property.price;}));
        $scope.property_min_price = Math.min.apply(Math,$scope.properties.map(function(property){return property.price;}));
        console.log($scope.properties); 
      }
      else
      {
        $scope.noPropertiesFound = true;
      }
    }).error(function(error) {
        console.log("Internal Server error occurred");
    });

  }

  // $scope.getRange = function(n){
  //   console.log("------------------get range---------------");
  //   return new Array(n);
  // }

  $scope.transitionToProperty = function(propertyId){
    $scope.selectedProperty = [];
    for(var i=0; i<$scope.properties.length; i++) {
      if($scope.properties[i]._id == propertyId)
        $scope.selectedProperty = $scope.properties[i];
    }
    console.log($scope.selectedProperty);
    $state.go('home.property', {selectedProperty: $scope.selectedProperty});
  }

});