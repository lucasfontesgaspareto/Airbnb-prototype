
airbnbApp.controller('controllerHome',function($scope,$log,$http){
	
	//hide signInError message on get signin page
	$scope.signInError = false;
	//Signup variables
	$scope.regfname="";
	$scope.reglname="";
	$scope.regpassword="";
	$scope.regemail="";
	$scope.regbday="";
	$scope.regtest="";
	//Invalid signup message holders
	$scope.invFname = "";
	$scope.invLname = "";
	$scope.invPaswd = "";
	$scope.invEmail = "";
	$scope.invBday = "";
	


	//This function will called after submitting the signup form
	/*
	   |-----------------------------------------------------------
	   | User register
	   |-----------------------------------------------------------
	  */
	$scope.signup = function()
	{
		console.log($scope.regtest);
		if(!$scope.applyValidations())
		{
			$http({
				method : "POST",
				url : '/user/register',
				data : {
					"username" : $scope.regemail,
					"password" : $scope.regpassword,
					"FirstName" : $scope.regfname,
					"LastName" : $scope.reglname,
					"Birthdat" : $scope.regbday
				}
			}).success(function(data){		
				if (data.statuscode == 0)
				{
					//$state.go('signin');
				}
				else
				{				
					if(data.message != null)
					{
						$scope.invEmail = "";
						$scope.invEmail = data.message;
					}
				}
			}).error(function(error) {
				console.log("error");
			});
		}
		else
		{
			console.log("Error in submitted values");
		}
	}
	
	$scope.clearInvSignUpMessages = function(){
		$scope.invFname = "";
		$scope.invLname = "";
		$scope.invPaswd = "";
		$scope.invemail = "";
		$scope.invBday = "";
	}
	
	$scope.applyValidations = function(){
		
		var validationsFlag = false;
		var fnameValidation = "";
		var lnameValidation ="";
		
		if($scope.regfname  != "")
			fnameValidation = $scope.regfname.match(/\d+/g);
		if($scope.reglname != "")
			lnameValidation = $scope.reglname.match(/\d+/g);
		
		if(fnameValidation != null && lnameValidation == null)
		{
			$scope.invFname = "Invalid First Name";
			console.log("fname");
			validationsFlag = true;
		}
		else if(fnameValidation == null && lnameValidation != null)
		{
			$scope.invLname = "Invalid Last Name";
			console.log("lname");
			validationsFlag = true;
		}
		else if(fnameValidation != null && lnameValidation != null)
		{
			console.log("flname");
			console.log($scope.regfname+" "+$scope.reglname);
			$scope.invLname = "First Name & Last Name Invalid";
			validationsFlag = true;
		}
		
		if($scope.regpassword.length < 8)
		{
			console.log($scope.regpassword);
			console.log("passw");
			$scope.invPaswd = "Password should have 8 or more characters";
			validationsFlag = true;			
		}
		
		var bday = new Date($scope.regbday);
		var currdate = new Date();
		if(bday > currdate)
		{
			console.log("bday");
			invBday = "Incorrect Birthday";
			validationsFlag = true;
		}
		return validationsFlag;
	}

	/*
   |-----------------------------------------------------------
   | User signin
   |-----------------------------------------------------------
  */
  $scope.signin = function() {
		console.log("---------------signin-------------");
		console.log($scope.email);
    $http({
      method : "POST",
      url : '/user/signin',
      data : {
        "email": $scope.email,
        "password": $scope.password
      }
    }).success(function(data) {
      if(data == 0) {
        window.location = '/';
			}
      else {
				//code to show error for signin
				$scope.signInError = true;
			}
    }).error(function(error) {
			alert("Internal sever error occured");
			window.setTimeout(function(){
				window.location = '/';
			}, 3000);
    });
  };

})
