

(function(){
	this.app.controller('LandingController', ['$scope', '$geolocation', '$uibModal', '$log', '$http',
		function($scope, $geolocation, $uibModal, $log, $http){
		var firstCall = 1;
		$geolocation.getCurrentPosition().then(function(position) {
			$scope.map = {
				center: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				},
				zoom: 18
			};
			console.info('Landing call Nº: ' + firstCall + ' - ' +  JSON.stringify($scope.map.center));
		});

		// setInterval(function(){
		//   $geolocation.getCurrentPosition().then(function(position) {
		//     $scope.map = {
		//       center: {
		//         latitude: position.coords.latitude,
		//         longitude: position.coords.longitude
		//       },
		//       zoom: 18
		//     };
		//     firstCall++;
		//     console.info('llamada N: ' + firstCall + ' ' +  JSON.stringify($scope.map.center));
		//   });
		// }, 5000);

		$scope.lunchModal = function (){
			$scope.page; 
			$http({ method: 'GET', url: '/angularTemplates', params: { page: 'login' }}).then(function (response){
				$scope.page = response;
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'login.html',
					controller: 'AuthController',
					size: 'lg'
				});

				modalInstance.result.then(function () {
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});

				
			}, function (error){
				$log.error(error);
			});


		};


	}]);
}).call(this);
