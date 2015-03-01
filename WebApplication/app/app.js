var adminSession='';
var userSession='';


var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'http://localhost:3000/'
    var obj = {};


    //SignIn
    obj.authenticate = function(){
        return $http.post(serviceBase + 'users/signIn', adminToSign).then(function (results) {
            return results;
        });
    };

    //User
    obj.getUsers = function(){
        return $http.get(serviceBase + 'users');
    }
    obj.getUser = function(userID){
        return $http.get(serviceBase + 'users/' + userID);
    }

    obj.insertUser = function (user) {
        return $http.post(serviceBase + 'users', user).then(function (results) {
            return results;
        });
    };

    obj.updateUser = function (id,user) {
        return $http.put(serviceBase + 'users/'+id, {user:user}).then(function (status) {
            return status.data;
        });
    };

    obj.deleteUser = function (id) {
        return $http.delete(serviceBase + 'users/' + id).then(function (status) {
            return status.data;
        });
    };

    //Admin
    obj.getAdmins = function(){
        return $http.get(serviceBase + 'admins');
    }
    obj.getAdmin = function(adminID){
        return $http.get(serviceBase + 'admins/' + adminID);
    }

    obj.insertAdmin = function (admin) {
        return $http.post(serviceBase + 'admins', admin).then(function (results) {
            return results;
        });
    };

    obj.updateAdmin = function (id,admin) {
        return $http.put(serviceBase + 'admins/'+id, {admin:admin}).then(function (status) {
            return status.data;
        });
    };

    obj.deleteAdmin = function (id) {
        return $http.delete(serviceBase + 'admins/' + id).then(function (status) {
            return status.data;
        });
    };

    //Objectif
    obj.getObjectifs = function(){
        return $http.get(serviceBase + 'objectifs');
    }
    obj.getObjectif = function(objectifID){
        return $http.get(serviceBase + 'objectifs/' + objectifID);
    }

    obj.insertObjectif = function (objectif) {
        return $http.post(serviceBase + 'objectifs', objectif).then(function (results) {
            return results;
        });
    };

    obj.updateObjectif = function (id,objectif) {
        return $http.put(serviceBase + 'objectifs/'+id, {objectif:objectif}).then(function (status) {
            return status.data;
        });
    };

    obj.deleteObjectif = function (id) {
        return $http.delete(serviceBase + 'objectifs/' + id).then(function (status) {
            return status.data;
        });
    };

    //Rule
    obj.getRules = function(){
        return $http.get(serviceBase + 'rules');
    }
    obj.getRule = function(ruleID){
        return $http.get(serviceBase + 'rules/' + ruleID);
    }

    obj.insertRule = function (rule) {
        return $http.post(serviceBase + 'rules', rule).then(function (results) {
            return results;
        });
    };

    obj.updateRule = function (id,rule) {
        return $http.put(serviceBase + 'rules/'+id, {rule:rule}).then(function (status) {
            return status.data;
        });
    };

    obj.deleteRule = function (id) {
        return $http.delete(serviceBase + 'rules/' + id).then(function (status) {
            return status.data;
        });
    };



    //Reclamation
    obj.getReclamations = function(){
        return $http.get(serviceBase + 'reclamations');
    }
    obj.getReclamation = function(reclamationID){
        return $http.get(serviceBase + 'reclamations/' + reclamationID);
    }

    obj.insertReclamation = function (reclamation) {
        return $http.post(serviceBase + 'reclamations', reclamation).then(function (results) {
            return results;
        });
    };

    obj.updateReclamation = function (id,reclamation) {
        return $http.put(serviceBase + 'reclamations/'+id, {reclamation:reclamation}).then(function (status) {
            return status.data;
        });
    };

    obj.deleteReclamation = function (id) {
        return $http.delete(serviceBase + 'reclamations/' + id).then(function (status) {
            return status.data;
        });
    };

    //Alertes
    obj.getAlertes = function(){
        return $http.get(serviceBase + 'alertes/email/'+userSession.email);
    }


    //Recommendations
    obj.getRecommendations = function(){
        return $http.get(serviceBase + 'recommendations/email/'+userSession.email);
    }


    //Sensor
    obj.getSensors = function(){
        return $http.get(serviceBase + 'sensors');
    }
    obj.getSensor = function(sensorID){
        return $http.get(serviceBase + 'sensors/' + sensorID);
    }
    obj.getHeartRate = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/Heart Rate');
    }

    obj.getGpsSpeed = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/GPS Speed');
    }

    obj.getGpsLocation = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/GPS Location');
    }

    obj.getAccelerometer = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/Accelerometer');
    }

    obj.getGyroscope = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/Gyroscope');
    }

    obj.getLight = function(){
        return $http.get(serviceBase + 'sensors/email'+userSession.email+'/name/Light');
    }

    obj.getLinearAcceleration = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/Linear Acceleration');
    }

    obj.getMagneticField = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/Magnetic Field');
    }

    obj.getRotationVector = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/Rotation Vector');
    }

    obj.getStepCounter = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/Step Counter');
    }

    obj.getGravity = function(){
        return $http.get(serviceBase + 'sensors/email/'+userSession.email+'/name/Gravity');
    }



    obj.insertSensor = function (sensor) {
        return $http.post(serviceBase + 'sensors', sensor).then(function (results) {
            return results;
        });
    };

    obj.updateSensor = function (id,sensor) {
        return $http.put(serviceBase + 'sensors/'+id, {sensor:sensor}).then(function (status) {
            return status.data;
        });
    };

    obj.deleteSensor = function (id) {
        return $http.delete(serviceBase + 'sensors/' + id).then(function (status) {
            return status.data;
        });
    };

    return obj;   
}]);

app.controller('listUsersCtrl', function ($scope, services,$location) {
    if(adminSession =='') {
        $location.url('/');
    }
    else {

        services.getUsers().then(function (data) {
            // console.log(data.data.users)
            $scope.users = data.data.users;
        });
    }
});

app.controller('listAdminsCtrl', function ($scope, services,$location) {
    if(adminSession =='') {
        $location.url('/');
    }
    else {
        services.getAdmins().then(function (data) {
            //console.log(data.data.admins)
            $scope.admins = data.data.admins;
        });
    }
});


app.controller('listObjectifsCtrl', function ($scope, services,$location) {
    if(adminSession =='') {
        $location.url('/');
    }
    else {
        services.getObjectifs().then(function (data) {
            //console.log(data.data.objectifs)
            $scope.objectifs = data.data.objectifs;
        });
    }
});

app.controller('listRulesCtrl', function ($scope, services,$location) {
    if(adminSession =='') {
        $location.url('/');
    }
    else {
        services.getRules().then(function (data) {
            //console.log(data.data.rules)
            $scope.rules = data.data.rules;
        });
    }
});

app.controller('listReclamationsCtrl', function ($scope, services,$location) {
    if(adminSession =='') {
        $location.url('/');
    }
    else {
        services.getReclamations().then(function (data) {
            $scope.reclamations = data.data.reclamations;
        });
    }
});

app.controller('listSensorsCtrl', function ($scope, services,$location) {
    if(adminSession =='') {
        $location.url('/');
    }
    else {
        services.getSensors().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;
        });
    }
});


//HeartRate
app.controller('ecgCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getHeartRate().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;

            $scope.chart = null;


            var rowValues = [];
            rowValues[0] = ('Heart Rate');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });
        });
    }
});


//Gyroscope
app.controller('gyroscopeCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getGyroscope().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;

            $scope.chart = null;


            var rowValues = [];
            rowValues[0] = ('Gyroscope');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });
        });
    }
});


//Light
app.controller('lightCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getLight().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;

            $scope.chart = null;


            var rowValues = [];
            rowValues[0] = ('Light');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });
        });
    }
});


//Linear Acceleration
app.controller('linearAccelerationCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getLinearAcceleration().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;

            $scope.chart = null;


            var rowValues = [];
            rowValues[0] = ('Linear Acceleration');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });
        });
    }
});


//Gravity
app.controller('gravityCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getGyroscope().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;

            $scope.chart = null;


            var rowValues = [];
            rowValues[0] = ('Gravity');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });
        });
    }
});


//Magnetic Field
app.controller('magneticFieldCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getMagneticField().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;

            $scope.chart = null;


            var rowValues = [];
            rowValues[0] = ('Magnetic Field');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });
        });
    }
});


//Rotation Vector
app.controller('rotationVectorCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getRotationVector().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;
            $scope.chart = null;
            var rowValues = [];
            rowValues[0] = ('Rotation Vector');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }
            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });
        });
    }
});


//Step Counter
app.controller('stepCounterCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getStepCounter().then(function (data) {
            $scope.sensors = data.data.sensors;

            $scope.chart = null;

            var rowValues = [];
            rowValues[0] = ('Step Counter');

            for (var i = 0; i < data.data.sensors.length; i++) {
                // for(var i = 0; i < 100; i++){
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });
        });
    }
});

//GPS Speed
app.controller('gpsSpeedCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getGpsSpeed().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;


            var rowValues = [];
            rowValues[0] = ('GPS Location');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                    ]
                }
            });


        });
    }
});


//GPS Location
app.controller('gpsLocationCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getGpsLocation().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;


            var myCenter = new google.maps.LatLng(parseFloat(data.data.sensors[0].value.substring(0, data.data.sensors[0].value.indexOf(','))), parseFloat(data.data.sensors[0].value.substring(data.data.sensors[0].value.indexOf(',') + 1)));

            var mapProp = {
                center: myCenter,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                var myCenter = new google.maps.LatLng(parseFloat(data.data.sensors[i].value.substring(0, data.data.sensors[i].value.indexOf(','))), parseFloat((data.data.sensors[i].value.substring(data.data.sensors[i].value.indexOf(',') + 1))));
                var marker = new google.maps.Marker({
                    position: myCenter
                });

                marker.setMap(map);
            }


        });

    }
});


//Accelerometer
app.controller('accelerometerCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getAccelerometer().then(function (data) {
            //console.log(data.data.sensors)
            $scope.sensors = data.data.sensors;


            $scope.chart = null;


            var rowValues = [];
            rowValues[0] = ('Accelerometer');

            //for(var i = 0; i < data.data.sensors.length; i++){
            for (var i = 0; i < 100; i++) {
                rowValues[i + 1] = (data.data.sensors[i].value);
            }


            $scope.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        rowValues
                        //['data1', 30, 200, 100, 400, 150, 250]
                        //['data2', 50, 20, 10, 40, 15, 25]
                    ]
                }
            });


        });
    }
});



//Alertes
app.controller('alertesCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getAlertes().then(function (data) {
            //console.log(data.data.sensors)
            $scope.alertes = data.data.alertes;
        });
    }
});


//Recommendations
app.controller('recommendationsCtrl', function ($scope, services,$location) {
    if(userSession =='') {
        $location.url('/');
    }
    else {
        services.getRecommendations().then(function (data) {
            $scope.recommendations = data.data.recommendations;
        });
    }
});



// editUserCtrl
app.controller('editUserCtrl', function ($scope, $rootScope, $location, $routeParams, services, user) {

    if(adminSession =='') {
        $location.url('/');
    }
    else {
        var userID = ($routeParams.userID) ? $routeParams.userID : 0;
        // var userID = $routeParams.userID;
        $rootScope.title = (userID == 0) ? 'Add User' : 'Edit User';
        $scope.buttonText = (userID == 0) ? 'Add New User' : 'Update User';


        console.log(user);

        var original = user.data;
        original._id = userID;
        $scope.user = angular.copy(original);
        $scope.user._id = userID;

        $scope.isClean = function () {
            return angular.equals(original, $scope.user);
        }

        $scope.deleteUser = function (user) {
            $location.path('/users');
            if (confirm("Are you sure to delete user id : " + $scope.user._id) == true)
                services.deleteUser(user._id);
        };


        $scope.saveUser = function (user) {
            $location.path('/users');
            if (userID == 0) {
                services.insertUser(user);
            }
            else {
                services.updateUser(userID, user);
            }
        };
    }
});




// editAdminCtrl
app.controller('editAdminCtrl', function ($scope, $rootScope, $location, $routeParams, services, admin) {
    if(adminSession =='') {
        $location.url('/');
    }
    else {

        var adminID = ($routeParams.adminID) ? $routeParams.adminID : 0;
        $rootScope.title = (adminID == 0) ? 'Add Admin' : 'Edit Admin';
        $scope.buttonText = (adminID == 0) ? 'Add New Admin' : 'Update Admin';


        var original = admin.data;
        original._id = adminID;
        $scope.admin = angular.copy(original);
        $scope.admin._id = adminID;

        $scope.isClean = function () {
            return angular.equals(original, $scope.admin);
        }

        $scope.deleteAdmin = function (admin) {
            $location.path('/admins');
            if (confirm("Are you sure to delete admin id : " + $scope.admin._id) == true)
                services.deleteAdmin(admin._id);
        };


        $scope.saveAdmin = function (admin) {
            $location.path('/admins');
            if (adminID == 0) {
                services.insertAdmin(admin);
            }
            else {
                services.updateAdmin(adminID, admin);
            }
        };
    }
});



// editSensorCtrl
app.controller('editSensorCtrl', function ($scope, $rootScope, $location, $routeParams, services, sensor) {
    if(adminSession =='') {
        $location.url('/');
    }
    else {

        var sensorID = ($routeParams.sensorID) ? $routeParams.sensorID : 0;

        $rootScope.title = (sensorID == 0) ? 'Add Sensor' : 'Edit Sensor';
        $scope.buttonText = (sensorID == 0) ? 'Add New Sensor' : 'Update Sensor';


        var original = sensor.data;
        original._id = sensorID;
        $scope.sensor = angular.copy(original);
        $scope.sensor._id = sensorID;

        $scope.isClean = function () {
            return angular.equals(original, $scope.sensor);
        }

        $scope.deleteSensor = function (sensor) {
            $location.path('/sensors');
            if (confirm("Are you sure to delete sensor id : " + $scope.sensor._id) == true)
                services.deleteSensor(sensor._id);
        };


        $scope.saveSensor = function (sensor) {
            $location.path('/sensors');
            if (sensorID == 0) {
                services.insertSensor(sensor);
            }
            else {
                services.updateSensor(sensorID, sensor);
            }
        };
    }
});




// editObjectifCtrl
app.controller('editObjectifCtrl', function ($scope, $rootScope, $location, $routeParams, services, objectif) {

    if(adminSession =='') {
        $location.url('/');
    }
    else {
        var objectifID = ($routeParams.objectifID) ? $routeParams.objectifID : 0;
        $rootScope.title = (objectifID == 0) ? 'Add Objectif' : 'Edit Objectif';
        $scope.buttonText = (objectifID == 0) ? 'Add New Objectif' : 'Update Objectif';


        var original = objectif.data;
        original._id = objectifID;
        $scope.objectif = angular.copy(original);
        $scope.objectif._id = objectifID;

        $scope.isClean = function () {
            return angular.equals(original, $scope.objectif);
        }

        $scope.deleteObjectif = function (objectif) {
            $location.path('/objectifs');
            if (confirm("Are you sure to delete objectif id : " + $scope.objectif._id) == true)
                services.deleteObjectif(objectif._id);
        };


        $scope.saveObjectif = function (objectif) {
            $location.path('/objectifs');
            if (objectifID == 0) {
                services.insertObjectif(objectif);
            }
            else {
                services.updateObjectif(objectifID, objectif);
            }
        };
    }
});



// editRuleCtrl
app.controller('editRuleCtrl', function ($scope, $rootScope, $location, $routeParams, services, rule) {

    if(adminSession =='') {
        $location.url('/');
    }
    else {
        var ruleID = ($routeParams.ruleID) ? $routeParams.ruleID : 0;

        $rootScope.title = (ruleID == 0) ? 'Add Rule' : 'Edit Rule';
        $scope.buttonText = (ruleID == 0) ? 'Add New Rule' : 'Update Rule';


        var original = rule.data;
        original._id = ruleID;
        $scope.rule = angular.copy(original);
        $scope.rule._id = ruleID;

        $scope.isClean = function () {
            return angular.equals(original, $scope.rule);
        }

        $scope.deleteRule = function (rule) {
            $location.path('/rules');
            if (confirm("Are you sure to delete Rule id : " + $scope.rule._id) == true)
                services.deleteRule(rule._id);
        };


        $scope.saveRule = function (rule) {
            $location.path('/rules');
            if (ruleID == 0) {
                services.insertRule(rule);
            }
            else {
                services.updateRule(ruleID, rule);
            }
        };
    }
});



// editReclamationCtrl
app.controller('editReclamationCtrl', function ($scope, $rootScope, $location, $routeParams, services, reclamation) {

    if(adminSession =='') {
        $location.url('/');
    }
    else {
        var reclamationID = ($routeParams.reclamationID) ? $routeParams.reclamationID : 0;

        $rootScope.title = (reclamationID == 0) ? 'Add Reclamation' : 'Edit Reclamation';
        $scope.buttonText = (reclamationID == 0) ? 'Add New Reclamation' : 'Update Reclamation';


        var original = reclamation.data;
        original._id = reclamationID;
        $scope.reclamation = angular.copy(original);
        $scope.reclamation._id = reclamationID;

        $scope.isClean = function () {
            return angular.equals(original, $scope.reclamation);
        }

        $scope.deleteReclamation = function (reclamation) {
            $location.path('/reclamations');
            if (confirm("Are you sure to delete Reclamation id : " + $scope.reclamation._id) == true)
                services.deleteReclamation(reclamation._id);
        };


        $scope.saveReclamation = function (reclamation) {
            $location.path('/reclamations');
            if (reclamationID == 0) {
                services.insertReclamation(reclamation);
            }
            else {
                services.updateReclamation(reclamationID, reclamation);
            }
        };
    }
});



// authCtrl
app.controller('authCtrl', function ($scope, $rootScope, $location, $routeParams, services) {



    userSession='';
    adminSession='';

    $scope.submitForm = function() {
        adminToSign=$scope.adminToSign;
        services.authenticate(adminToSign).then(function(data){


            if(( data.data.admins != undefined )&&( data.data.admins.length != 0 ))
            {
                adminSession = data.data.admins[0];
                $location.url('/admins');

            }
            else if(( data.data.users !=undefined  )&&( data.data.users.length != 0 ))
            {
                userSession = data.data.users[0];
                $location.url('/gpsLocation');


            }
            else
            {
                $scope.result = "Authentification Error !";
                console.log('3');

            }
        });
        }


});




app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/users', {
            title: 'Users',
            templateUrl: 'partials/users.html',
            controller: 'listUsersCtrl'
        })
        .when('/admins', {
          title: 'Admins',
          templateUrl: 'partials/admins.html',
          controller: 'listAdminsCtrl'
      })
        .when('/sensors', {
          title: 'Sensors',
          templateUrl: 'partials/sensors.html',
          controller: 'listSensorsCtrl'
      })
        .when('/objectifs', {
          title: 'Objectifs',
          templateUrl: 'partials/objectifs.html',
          controller: 'listObjectifsCtrl'
      })
        .when('/rules', {
            title: 'Rules',
            templateUrl: 'partials/rules.html',
            controller: 'listRulesCtrl'
        })
        .when('/reclamations', {
            title: 'Reclamations ',
            templateUrl: 'partials/reclamations.html',
            controller: 'listReclamationsCtrl'
        })
        .when('/ecg', {
            title: 'ECG',
            templateUrl: 'partials/ecg.html',
            controller: 'ecgCtrl'
        })
        .when('/accelerometer', {
            title: 'Accelerometer',
            templateUrl: 'partials/accelerometer.html',
            controller: 'accelerometerCtrl'
        })
        .when('/gyroscope', {
            title: 'Gyroscope',
            templateUrl: 'partials/gyroscope.html',
            controller: 'gyroscopeCtrl'
        })
        .when('/light', {
            title: 'Light',
            templateUrl: 'partials/light.html',
            controller: 'lighteCtrl'
        })
        .when('/linearAcceleration', {
            title: 'Linear Acceleration',
            templateUrl: 'partials/linearAcceleration.html',
            controller: 'linearAccelerationCtrl'
        })
        .when('/magneticField', {
            title: 'Magnetic Field',
            templateUrl: 'partials/magneticField.html',
            controller: 'magneticFieldCtrl'
        })
        .when('/rotationVector', {
            title: 'Rotation Vector',
            templateUrl: 'partials/rotationVector.html',
            controller: 'rotationVectorCtrl'
        })
        .when('/stepCounter', {
            title: 'Step Counter',
            templateUrl: 'partials/stepCounter.html',
            controller: 'stepCounterCtrl'
        })
        .when('/gravity', {
            title: 'Gravity',
            templateUrl: 'partials/gravity.html',
            controller: 'gravityCtrl'
        })
        .when('/gpsSpeed', {
            title: 'GPS Speed',
            templateUrl: 'partials/GpsSpeed.html',
            controller: 'gpsSpeedCtrl'
        })
        .when('/gpsLocation', {
            title: 'GPS Location',
            templateUrl: 'partials/GpsLocation.html',
            controller: 'gpsLocationCtrl'
        })
        .when('/alertes', {
            title: 'Alertes',
            templateUrl: 'partials/alertes.html',
            controller: 'alertesCtrl'
        })
        .when('/recommendations', {
            title: 'Recommendations',
            templateUrl: 'partials/recommendations.html',
            controller: 'recommendationsCtrl'
        })
        .when('/edit-user/:userID', {
            title: 'Edit Users',
            templateUrl: 'partials/edit-user.html',
            controller: 'editUserCtrl',
            resolve: {
                user: function(services, $route){
                    var userID = $route.current.params.userID;
                    if(userID!=0) {
                        return services.getUser(userID);
                    }
                    else {
                        user= {
                            data :
                            {
                                _id: "0",
                                firstName: "",
                                lastName: "",
                                age: "",
                                sex: "",
                                height: "",
                                weight: "",
                                email: "",
                                password: ""
                            }
                    };
                        return user;
                    }
                }
            }
        })
        .when('/edit-admin/:adminID', {
            title: 'Edit Admins',
            templateUrl: 'partials/edit-admin.html',
            controller: 'editAdminCtrl',
            resolve: {
                admin: function(services, $route){
                    var adminID = $route.current.params.adminID;
                    if(adminID!=0) {
                        return services.getAdmin(adminID);
                    }
                    else {
                        admin= {
                            data :
                            {
                                _id: "0",
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: ""
                            }
                        };
                        return admin;
                    }
                }
            }
        })
        .when('/edit-objectif/:objectifID', {
            title: 'Edit Objectifs',
            templateUrl: 'partials/edit-objectif.html',
            controller: 'editObjectifCtrl',
            resolve: {
                objectif: function(services, $route){
                    var objectifID = $route.current.params.objectifID;
                    if(objectifID!=0) {
                        return services.getObjectif(objectifID);
                    }
                    else {
                        objectif= {
                            data :
                            {
                                _id: "0",
                                name: "",
                                priority: "",
                                userEmail: "",
                                admin: ""
                            }
                        };
                        return objectif;
                    }
                }
            }
        })
        .when('/edit-reclamation/:reclamationID', {
            title: 'Edit Reclamations',
            templateUrl: 'partials/edit-reclamation.html',
            controller: 'editReclamationCtrl',
            resolve: {
                reclamation: function(services, $route){
                    var reclamationID = $route.current.params.reclamationID;
                    if(reclamationID!=0) {
                        return services.getReclamation(reclamationID);
                    }
                    else {
                        reclamation= {
                            data :
                            {
                                _id: "0",
                                description: "",
                                userEmail: ""
                            }
                        };
                        return reclamation;
                    }
                }
            }
        })
        .when('/edit-rule/:ruleID', {
            title: 'Edit Rules',
            templateUrl: 'partials/edit-rule.html',
            controller: 'editRuleCtrl',
            resolve: {
                rule: function(services, $route){
                    var ruleID = $route.current.params.ruleID;
                    if(ruleID!=0) {
                        return services.getRule(ruleID);
                    }
                    else {
                        rule= {
                            data :
                            {
                                _id: "0",
                                name: "",
                                description: "",
                                formule: "",
                                adminEmail: ""
                            }
                        };
                        return rule;
                    }
                }
            }
        })
        .when('/edit-sensor/:sensorID', {
            title: 'Edit Sensors',
            templateUrl: 'partials/edit-sensor.html',
            controller: 'editSensorCtrl',
            resolve: {
                sensor: function(services, $route){
                    var sensorID = $route.current.params.sensorID;
                    if(sensorID!=0) {
                        return services.getSensor(sensorID);
                    }
                    else {
                        sensor= {
                            data :
                            {
                                _id: "0",
                                name: "",
                                value: "",
                                date: "",
                                time: "",
                                userEmail: "",
                                accuracy: "",
                                timestamp: ""
                            }
                        };
                        return sensor;
                    }
                }
            }
        })
        .when('/auth', {
            title: 'Authentification',
            templateUrl: 'auth.html',
            controller: 'authCtrl',
            resolve: {
                adminToSign : function(){
                    adminToSign= {
                        data : {
                            email: "",
                            password: ""
                        }
                    };
                    return adminToSign;
                }

            }
        })
      .otherwise({
        redirectTo: '/auth'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);