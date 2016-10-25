var app = angular.module('starter.services', [])

app.factory("trailService", [ '$firebaseArray',function($firebaseArray){

	var service = {};
	var config = {
    apiKey: "AIzaSyD_7jc982WaevtfJSQaRs-Kg6BXeF9aHCA",
    authDomain: "trailracedb.firebaseapp.com",
    databaseURL: "https://trailracedb.firebaseio.com",
    storageBucket: "trailracedb.appspot.com",
    messagingSenderId: "228760600957"
  };

  	var mainApp = firebase.initializeApp(config);

	service.auth = mainApp.auth();
	service.ref= mainApp.database().ref();
	//service.fire=$firebaseArray(mainApp.database());
	return service;

}]);
app.service("Auth", function($firebaseAuth) {
	var ref = new Firebase('https://trailracedb.firebaseio.com/');
	var auth = $firebaseAuth(ref);
	return auth;
}
);

app.service("serviceMap", function() {

	var puntos=[];
	 this.agregarPoly = function(latLng,newLatLng,mapActual) {
		var polyline = [
		latLng,
		newLatLng
		];
		puntos.push(newLatLng);

		var polylineopts = {
			path: polyline,
			map: mapActual,
			strokecolor: 'blue',
			strokeopacity: 1.6,
			strokeweight: 3,
			geodesic: true
		};

		var poly = new google.maps.Polyline(polylineopts);
	};

});

app.service("loginJS", function() {

	$('.form').find('input, textarea').on('keyup blur focus', function (e) {

		var $this = $(this),
		label = $this.prev('label');

		if (e.type === 'keyup') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.addClass('active highlight');
			}
		} else if (e.type === 'blur') {
			if( $this.val() === '' ) {
				label.removeClass('active highlight'); 
			} else {
				label.removeClass('highlight');   
			}   
		} else if (e.type === 'focus') {

			if( $this.val() === '' ) {
				label.removeClass('highlight'); 
			} 
			else if( $this.val() !== '' ) {
				label.addClass('highlight');
			}
		}

	});

	$('.tab a').on('click', function (e) {

		e.preventDefault();

		$(this).parent().addClass('active');
		$(this).parent().siblings().removeClass('active');

		target = $(this).attr('href');

		$('.tab-content > div').not(target).hide();

		$(target).fadeIn(600);

	});
});
