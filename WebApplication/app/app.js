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
        console.log(data.data.users)
        $scope.users = data.data.users;
    });
});

app.controller('listAdminsCtrl', function ($scope, services) {
    services.getAdmins().then(function(data){
        console.log(data.data.admins)
        $scope.admins = data.data.admins;
    });
});


app.controller('listObjectifsCtrl', function ($scope, services) {
    services.getObjectifs().then(function(data){
        console.log(data.data.objectifs)
        $scope.objectifs = data.data.objectifs;
    });
});

app.controller('listRulesCtrl', function ($scope, services) {
    services.getRules().then(function(data){
        console.log(data.data.rules)
        $scope.rules = data.data.rules;
    });
});

app.controller('listSensorsCtrl', function ($scope, services) {
    services.getSensors().then(function(data){
        console.log(data.data.sensors)
        $scope.sensors = data.data.sensors;
    });
});


// editUserCtrl
app.controller('editUserCtrl', function ($scope, $rootScope, $location, $routeParams, services, user) {
   // var userID = ($routeParams.userID) ? parseInt($routeParams.userID) : 0;
    var userID = $routeParams.userID;
    //$rootScope.title = (userID > 0) ? 'Edit User' : 'Add User';
    //$scope.buttonText = (userID > 0) ? 'Update User' : 'Add New User';
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
        $location.path('/');
        if(confirm("Are you sure to delete user id : "+$scope.user._id)==true)
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