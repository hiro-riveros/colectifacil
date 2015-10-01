

(function(){
	this.app.controller('landingController', ['$scope', '$geolocation',
		function($scope, $geolocation){
    var firstCall = 1;
    $geolocation.getCurrentPosition().then(function(position) {
      $scope.map = {
        center: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        zoom: 18
      };
      console.info('llamada N: ' + firstCall + ' ' +  JSON.stringify($scope.map.center));
    });

    setInterval(function(){
      $geolocation.getCurrentPosition().then(function(position) {
        $scope.map = {
          center: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          zoom: 18
        };
        firstCall++;
        console.info('llamada N: ' + firstCall + ' ' +  JSON.stringify($scope.map.center));
      });
    }, 5000);

  }]);
}).call(this);
