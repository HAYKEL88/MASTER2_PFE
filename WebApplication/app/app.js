var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'http://localhost:3000/'
    var obj = {};

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

    //Sensor
    obj.getSensors = function(){
        return $http.get(serviceBase + 'sensors');
    }
    obj.getSensor = function(sensorID){
        return $http.get(serviceBase + 'sensors/' + sensorID);
    }
    obj.getHeartRate = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Heart Rate');
    }

    obj.getGpsSpeed = function(){
        return $http.get(serviceBase + 'sensors/email/test@test.com/name/GPS Speed');
    }

    obj.getGpsLocation = function(){
        return $http.get(serviceBase + 'sensors/email/test@test.com/name/GPS Location');
    }

    obj.getAccelerometer = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Accelerometer');
    }

    obj.getGyroscope = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Gyroscope');
    }

    obj.getLight = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Light');
    }

    obj.getLinearAcceleration = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Linear Acceleration');
    }

    obj.getMagneticField = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Magnetic Field');
    }

    obj.getRotationVector = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Rotation Vector');
    }

    obj.getStepCounter = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Step Counter');
    }

    obj.getGravity = function(){
        return $http.get(serviceBase + 'sensors/email/pfe@pfe.pfe/name/Gravity');
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

app.controller('listUsersCtrl', function ($scope, services) {
    services.getUsers().then(function(data){
       // console.log(data.data.users)
        $scope.users = data.data.users;
    });
});

app.controller('listAdminsCtrl', function ($scope, services) {
    services.getAdmins().then(function(data){
        //console.log(data.data.admins)
        $scope.admins = data.data.admins;
    });
});


app.controller('listObjectifsCtrl', function ($scope, services) {
    services.getObjectifs().then(function(data){
        //console.log(data.data.objectifs)
        $scope.objectifs = data.data.objectifs;
    });
});

app.controller('listRulesCtrl', function ($scope, services) {
    services.getRules().then(function(data){
        //console.log(data.data.rules)
        $scope.rules = data.data.rules;
    });
});

app.controller('listSensorsCtrl', function ($scope, services) {
    services.getSensors().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;
    });
});


//HeartRate
app.controller('ecgCtrl', function ($scope, services) {
    services.getHeartRate().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;

        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Heart Rate');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


//Gyroscope
app.controller('gyroscopeCtrl', function ($scope, services) {
    services.getGyroscope().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;

        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Gyroscope');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


//Light
app.controller('lightCtrl', function ($scope, services) {
    services.getLight().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;

        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Light');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


//Linear Acceleration
app.controller('linearAccelerationCtrl', function ($scope, services) {
    services.getLinearAcceleration().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;

        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Linear Acceleration');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


//Gravity
app.controller('gravityCtrl', function ($scope, services) {
    services.getGyroscope().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;

        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Gravity');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


//Magnetic Field
app.controller('magneticFieldCtrl', function ($scope, services) {
    services.getMagneticField().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;

        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Magnetic Field');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


//Rotation Vector
app.controller('rotationVectorCtrl', function ($scope, services) {
    services.getRotationVector().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;

        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Rotation Vector');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


//Step Counter
app.controller('stepCounterCtrl', function ($scope, services) {
    services.getStepCounter().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;

        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Step Counter');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});

//GPS Speed
app.controller('gpsSpeedCtrl', function ($scope, services) {
    services.getGpsSpeed().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;


        var rowValues = [];
        rowValues[0]=('GPS Location');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


//GPS Location
app.controller('gpsLocationCtrl', function ($scope, services) {
    services.getGpsLocation().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;


        var myCenter = new google.maps.LatLng(parseFloat(data.data.sensors[0].value.substring(0,data.data.sensors[0].value.indexOf(','))),parseFloat(data.data.sensors[0].value.substring(data.data.sensors[0].value.indexOf(',')+1)) );

        var mapProp = {
            center:myCenter,
            zoom:12,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };

        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i =0;i<100;i++)
        {
            var myCenter = new google.maps.LatLng(parseFloat(data.data.sensors[i].value.substring(0,data.data.sensors[i].value.indexOf(','))),parseFloat((data.data.sensors[i].value.substring(data.data.sensors[i].value.indexOf(',')+1)) ));
            var marker=new google.maps.Marker({
                position:myCenter
            });

            marker.setMap(map);
        }







    });
});


//Accelerometer
app.controller('accelerometerCtrl', function ($scope, services) {
    services.getAccelerometer().then(function(data){
        //console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;


        $scope.chart = null;



        var rowValues = [];
        rowValues[0]=('Accelerometer');

        //for(var i = 0; i < data.data.sensors.length; i++){
        for(var i = 0; i < 100; i++){
            rowValues[i+1]=(data.data.sensors[i].value);
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
});


// editUserCtrl
app.controller('editUserCtrl', function ($scope, $rootScope, $location, $routeParams, services, user) {
    var userID = ($routeParams.userID) ? $routeParams.userID : 0;
    var userID = $routeParams.userID;
     $rootScope.title = (userID == 0) ? 'Add User' : 'Edit User';
    $scope.buttonText = (userID == 0) ?  'Add New User' : 'Update User';
    $rootScope.title = 'Edit User';
    $scope.buttonText = 'Update User';
    var original = user.data;
    original._id = userID;
    $scope.user = angular.copy(original);
    $scope.user._id = userID;

    $scope.isClean = function() {
        return angular.equals(original, $scope.user);
    }

    $scope.deleteUser = function(user) {
        $location.path('/users');
        if(confirm("Are you sure to delete user id : "+$scope.user._id)==true)
            services.deleteUser(user._id);
    };



    $scope.saveUser = function(user) {
        $location.path('/users');
        if (userID == 0) {
            services.insertUser(user);
        }
        else {
            services.updateUser(userID, user);
        }
    };
});

/*
// editAdminCtrl
app.controller('editAdminCtrl', function ($scope, $rootScope, $location, $routeParams, services, admin) {
    var userID = $routeParams.adminID
    //  $rootScope.title = (adminID > 0) ? 'Edit User' : 'Add User';
    //  $scope.buttonText = (adminID > 0) ? 'Update User' : 'Add New User';
    $rootScope.title = 'Edit Admin';
    $scope.buttonText = 'Update Admin';
    var original = admin.data;
    original._id = adminID;
    $scope.user = angular.copy(original);
    $scope.user._id = adminID;

    $scope.isClean = function() {
        return angular.equals(original, $scope.admin);
    }

    $scope.deleteAdmin = function(user) {
        $location.path('/');
        if(confirm("Are you sure to delete admin id : "+$scope.admin._id)==true)
            services.deleteAdmin(admin._id);
    };

    $scope.saveAdmin = function(user) {
        $location.path('/');
        if (userID <= 0) {
            services.insertUser(user);
        }
        else {
            services.updateUser(userID, user);
        }
    };
});


// editUserCtrl
app.controller('editUserCtrl', function ($scope, $rootScope, $location, $routeParams, services, user) {
    var userID = ($routeParams.userID) ? parseInt($routeParams.userID) : 0;
    $rootScope.title = (userID > 0) ? 'Edit User' : 'Add User';
    $scope.buttonText = (userID > 0) ? 'Update User' : 'Add New User';
    var original = user.data;
    original._id = userID;
    $scope.user = angular.copy(original);
    $scope.user._id = userID;

    $scope.isClean = function() {
        return angular.equals(original, $scope.user);
    }

    $scope.deleteUser = function(user) {
        $location.path('/');
        if(confirm("Are you sure to delete user number: "+$scope.user._id)==true)
            services.deleteUser(user._id);
    };

    $scope.saveUser = function(user) {
        $location.path('/');
        if (userID <= 0) {
            services.insertUser(user);
        }
        else {
            services.updateUser(userID, user);
        }
    };
});


// editUserCtrl
app.controller('editUserCtrl', function ($scope, $rootScope, $location, $routeParams, services, user) {
    var userID = ($routeParams.userID) ? parseInt($routeParams.userID) : 0;
    $rootScope.title = (userID > 0) ? 'Edit User' : 'Add User';
    $scope.buttonText = (userID > 0) ? 'Update User' : 'Add New User';
    var original = user.data;
    original._id = userID;
    $scope.user = angular.copy(original);
    $scope.user._id = userID;

    $scope.isClean = function() {
        return angular.equals(original, $scope.user);
    }

    $scope.deleteUser = function(user) {
        $location.path('/');
        if(confirm("Are you sure to delete user number: "+$scope.user._id)==true)
            services.deleteUser(user._id);
    };

    $scope.saveUser = function(user) {
        $location.path('/');
        if (userID <= 0) {
            services.insertUser(user);
        }
        else {
            services.updateUser(userID, user);
        }
    };
});


// editUserCtrl
app.controller('editUserCtrl', function ($scope, $rootScope, $location, $routeParams, services, user) {
    var userID = ($routeParams.userID) ? parseInt($routeParams.userID) : 0;
    $rootScope.title = (userID > 0) ? 'Edit User' : 'Add User';
    $scope.buttonText = (userID > 0) ? 'Update User' : 'Add New User';
    var original = user.data;
    original._id = userID;
    $scope.user = angular.copy(original);
    $scope.user._id = userID;

    $scope.isClean = function() {
        return angular.equals(original, $scope.user);
    }

    $scope.deleteUser = function(user) {
        $location.path('/');
        if(confirm("Are you sure to delete user number: "+$scope.user._id)==true)
            services.deleteUser(user._id);
    };

    $scope.saveUser = function(user) {
        $location.path('/');
        if (userID <= 0) {
            services.insertUser(user);
        }
        else {
            services.updateUser(userID, user);
        }
    };
});
*/
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
        .when('/edit-user/:userID', {
            title: 'Edit Users',
            templateUrl: 'partials/edit-user.html',
            controller: 'editUserCtrl',
            resolve: {
                user: function(services, $route){
                    var userID = $route.current.params.userID;
                    return services.getUser(userID);
                }
            }
        })
        .when('/edit-admin/:adminID', {
            title: 'Edit Admins',
            templateUrl: 'partials/edit-admin.html',
            controller: 'editAdminCtrl',
            resolve: {
                user: function(services, $route){
                    var adminID = $route.current.params.adminID;
                    return services.getAdmin(adminID);
                }
            }
        })
        .when('/edit-objectif/:objectifID', {
            title: 'Edit Objectifs',
            templateUrl: 'partials/edit-objectif.html',
            controller: 'editObjectifCtrl',
            resolve: {
                user: function(services, $route){
                    var objectifID = $route.current.params.objectifID;
                    return services.getObjectif(objectifID);
                }
            }
        })
        .when('/edit-sensor/:sensorID', {
            title: 'Edit Sensors',
            templateUrl: 'partials/edit-user.html',
            controller: 'editSensorCtrl',
            resolve: {
                user: function(services, $route){
                    var sensorID = $route.current.params.sensorID;
                    return services.getSensor(sensorID);
                }
            }
        })
        .when('/edit-rule/:ruleID', {
            title: 'Edit Rules',
            templateUrl: 'partials/edit-rule.html',
            controller: 'editRuleCtrl',
            resolve: {
                user: function(services, $route){
                    var ruleID = $route.current.params.ruleID;
                    return services.getRule(ruleID);
                }
            }
        })
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);