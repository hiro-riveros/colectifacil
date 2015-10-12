(function(){
	this.app.controller('ContactController', ['$scope', '$geolocation', '$http',
		function($scope, $geolocation, $http) {
			$scope.contact = {};
			var firstCall = 1;

			$scope.sendContact = function (){
				try{
					if ($scope.contact.email !== '' &&  $scope.contact.email !== undefined 
						&& $scope.contact.message !== '' && $scope.contact.message !== undefined) {
						$http.post('/contact', { 
								name: $scope.contact.name,
								email: $scope.contact.email,
								message: $scope.contact.message 
						})
						.success(function(data){
							if (data === 'ok') {
								alert('gracias por ponerte en contacto con nosotros, revisaremos tu mesaje y contactaremos');
							};
						})
						.error(function(error){
							debugger;
						});
				}else{
					alert('error')
				};


			}catch(e){
				alert('error' + e.message)
				console.error('error: ' + e.message);
			}
		};

		$geolocation.getCurrentPosition().then(function(position) {
			$scope.map = {
				center: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				},
				zoom: 13
			};
			console.info('Contact call Nº: ' + firstCall + ' - ' +  JSON.stringify($scope.map.center));
		});
		$scope.options = {
			styles: [
			{
				"featureType":"all",
				"elementType":"labels.text.fill",
				"stylers":[
				{
					"color":"#ffffff"
				}
				]
			},
			{
				"featureType":"all",
				"elementType":"labels.text.stroke",
				"stylers":[{
					"color":"#000000"
				},
				{
					"lightness":13
				}]
			},
			{
				"featureType":"administrative",
				"elementType":"geometry.fill",
				"stylers":[{
					"color":"#000000"
				}]
			},
			{
				"featureType":"administrative",
				"elementType":"geometry.stroke",
				"stylers": [
				{
					"color":"#144b53"
				},
				{
					"lightness":14
				},
				{
					"weight":1.4
				}
				]},
				{
					"featureType":"landscape",
					"elementType":"all",
					"stylers":[
					{
						"color":"#08304b"
					}
					]
				},
				{
					"featureType":"poi",
					"elementType":"geometry",
					"stylers":[
					{
						"color":"#0c4152"
					},
					{
						"lightness":5
					}
					]
				},
				{
					"featureType":"road.highway",
					"elementType":"geometry.fill",
					"stylers":[
					{
						"color":"#000000"
					}
					]
				},
				{
					"featureType":"road.highway",
					"elementType":"geometry.stroke",
					"stylers":[
					{
						"color":"#0b434f"
					},
					{
						"lightness":25
					}
					]
				},
				{
					"featureType":"road.arterial",
					"elementType":"geometry.fill",
					"stylers":[
					{
						"color":"#000000"
					}
					]
				},
				{
					"featureType":"road.arterial",
					"elementType":"geometry.stroke",
					"stylers":[
					{
						"color":"#0b3d51"
					},
					{
						"lightness":16
					}
					]
				},
				{
					"featureType":"road.local",
					"elementType":"geometry",
					"stylers":[
					{
						"color":"#000000"
					}
					]
				},
				{
					"featureType":"transit",
					"elementType":"all",
					"stylers":[
					{
						"color":"#146474"
					}
					]
				},
				{
					"featureType":"water",
					"elementType":"all",
					"stylers":[
					{
						"color":"#021019"
					}
					]
				}
				]
			};
		}]);
}).call(this);