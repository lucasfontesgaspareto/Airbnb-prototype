airbnbApp.controller('controllerHostAnalytics',function($log, $scope,$http,$state,$stateParams){

	$scope.pages = [];
	$scope.counts = [];

	$scope.props = [];
	$scope.propClicks = [];

	$scope.area = [];
	$scope.seen = [];

	$http({
		method : "POST",
		url : "/host/getclicksperpage",
		data : {}
	}).success(function(data){
		var plotData = data.result.data;
		$scope.pages = [];
		$scope.counts = [];
		var pageColors = [];
		var counter = 0;
		for(counter = 0; counter < plotData.length; counter++){			
			if((plotData[counter]._id.split("#/"))[1] == ""){
				console.log('I am here for null');
				$scope.pages.push("home");
			}else{
				$scope.pages.push(plotData[counter]._id.split("#/")[1]);	
			}
			
			$scope.counts.push(plotData[counter].count);
			pageColors.push('#36A2EB');
		}

		//Plot the graph here
		var barChartData = {
				labels: $scope.pages,
				datasets: [{
					label: 'Page Clicks',
					data: $scope.counts,
					backgroundColor: pageColors,
					borderWidth: 0
				}]
			};


		var barChartElement = document.getElementById("admin-bar-chart");
		var barChart = new Chart(barChartElement, {
			type: 'bar',
			data: barChartData,
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});	


	}).error(function(error){


	});


// Clicks per property here:

	$http({
		method : "POST",
		url : "/host/getclicksperproperty",
		data : {}
	}).success(function(data){
		console.log(data.result.data);
		var plotData = data.result.data;
		var pages = [];
		var counts = [];
		var pageColors = [];
		var counter = 0;
		for(counter = 0; counter < plotData.length; counter++){			
			$scope.props.push(plotData[counter]._id);	
			$scope.propClicks.push(plotData[counter].count);
			pageColors.push('#4BC0C0');
		}

		//Plot the graph here
		var barChartData = {
				labels: $scope.props,
				datasets: [{
					label: 'Property Clicks',
					data: $scope.propClicks,
					backgroundColor: pageColors,
					borderWidth: 0
				}]
			};


		var barChartElement = document.getElementById("admin-bar-chart1");
		var barChart = new Chart(barChartElement, {
			type: 'bar',
			data: barChartData,
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});	


	}).error(function(error){


	});



// Area less seen




})