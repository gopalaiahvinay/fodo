angular.module('fodo.controllers', [])
    .controller('mapCtrl', ['$scope','$cordovaGeolocation', function(scope,$cordovaGeolocation) {
    	var curLocation= {};
        var locations = [
            ['Mayors House', 13.031328, 77.59131320000006, 4],
            ['Richmond Manor', 12.9791734, 77.57704669999998, 5],
            ['Victoria\'s Mansion', 13.0410573, 77.55489220000004, 3],
            ['Mallya Mansion', 12.9791734, 77.57704669999998, 2]
        ];
        var options = { timeout: 10000, enableHighAccuracy: true };
        $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
            
            console.log('Postion is:', position);
            console.log('Latitude:',position.coords.latitude);
            console.log('Longitude:', position.coords.longitude);
            curLocation = {
            	lat: position.coords.latitude,
            	long: position.coords.longitude
            };

            var myMarker = ['Me', curLocation.lat,curLocation.long,6];
            locations.push(myMarker);
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: new google.maps.LatLng(curLocation.lat, curLocation.long),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map,
                    icon: 'img/customMarker_mod.png'
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    };
                })(marker, i));
            }
        }, function(error) {
            console.log("Could not get location");
        });
        //End og ngCordova
        

        
    }]);
