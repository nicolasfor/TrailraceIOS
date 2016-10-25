var app=angular.module('starter.controllers', [])

app.controller('loginCtrl', ['$scope', 'trailService', '$state', 'loginJS', function($scope, trailService, $state, loginJS) {



  $scope.service = trailService;
  $scope.service2=loginJS;

  var auth = $scope.service.auth;
  var refData= $scope.service.ref;
  auth.onAuthStateChanged(function(user) {
  if (user) {
    $state.go('crearMapa',{});
  } else {
    // No user is signed in.
  }
});

 $scope.user = {};
 $scope.loguearse = function() {
  if($scope.user.email===undefined){
   $scope.errorMsg = "Inserte usuario";
 }
 else if($scope.user.password===undefined){
   $scope.errorMsg = "Inserte contraseña";
 }
 else{
  auth.signInWithEmailAndPassword($scope.user.email,$scope.user.password).then(function(user){
    if (user) {
      $state.go('crearMapa',{});
      
    }
    else {
      alert("Usuario o contraseña errada");
    }
  })

}

};

$scope.registrarse = function() {

 if($scope.user.name===undefined){
  alert("Inserte name");
}
else if($scope.user.email===undefined){
  alert("Inserte Email");
}
else if($scope.user.password===undefined){
  alert("Inserte Password");
}
else if($scope.user.password!==$scope.user.password2){
 alert("Passwords deben coincidir");
}
else if($scope.user.password.length<6){
  alert("Passwords debe contener al menos seis caracteres");
}
else{
  auth.createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(user){
    var uidS=user.uid;
    var messageListRef = refData.child('users').child(uidS); 
    messageListRef.set({'name':$scope.user.name}); 
    $scope.user.name="";
    $scope.user.email="";
    $scope.user.password="";
    $scope.user.password2="";
    alert("Usuario agregado exitosamente, por favor loguee");

  }).catch(function(error) {
    console.log("Error: ", error);
  });

}
};


}]);

app.controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation, serviceMap) {

  var latLng;
  var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
  var userMarker;
  puntoinicio=null;
  $scope.empezar=false;
  $scope.pintar=false;
  $scope.termino=false;
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  var onSuccess = function(position) {

    latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });
  };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    
    $scope.$watch('empezar', function() {
    });
    $scope.$watch('dibujar', function() {
    });
    $scope.$watch('termino', function() {
    });

    $scope.ubicarPunto = function(){
      $scope.empezar=true;
    };
    $scope.dibujar = function(){
      $scope.pintar=true;
    };
    $scope.terminar = function(){
      $scope.termino=true;
    };

    function onSuccessWatch(position) {
      var newLatLng= new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      if($scope.empezar==true && puntoinicio==null){
          puntoinicio = new google.maps.Marker({
            map: $scope.map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: newLatLng
          });
        }
      if(newLatLng.lat()!=latLng.lat() && newLatLng.lng()!=latLng.lng() ){

        userMarker.setPosition(newLatLng);
        $scope.map.setCenter(newLatLng);
        if($scope.pintar==true && $scope.termino==false){
          serviceMap.agregarPoly(latLng,newLatLng,$scope.map);
        }
        //alert(newLatLng.lat()+"-negro"+latLng.lat());
        latLng=newLatLng;
      }
    }

    function onErrorWatch(error) {
    }

    var watchID = navigator.geolocation.watchPosition(onSuccessWatch, onErrorWatch, { timeout: 30000 });

    

    

  });




