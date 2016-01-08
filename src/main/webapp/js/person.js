var personApp = angular.module("person_ctrl", [ "ngRoute", "ngResource", "ui.bootstrap", "servicesApp", "timekeeperApp" ]);

/* ********************************************************
 * 
 * Person controllers
 * 
 * ********************************************************
 */

personApp.controller("person_listing_ctrl", function($scope, $http, $window) {
	
    $scope.list_enabled = 1;
    $scope.loading = true;
    
    $scope.refresh = function() {
    	$http.get('/timekeeper/svc/person/list?e='+$scope.list_enabled).success(function(data) {
    		$scope.persons = data;
    		$scope.loading = false;
    	});
    };
    $scope.refresh();
	
	$scope.disable = function(personId) {
		$http.get("/timekeeper/svc/person/"+personId+"/disable");
		$window.location.reload();
	};
	$scope.enable = function(personId) {
		$http.get("/timekeeper/svc/person/"+personId+"/enable");
		$window.location.reload();
	};
	$scope.delete = function(personId) {
		$http.get("/timekeeper/svc/person/"+personId+"/delete");
		$window.location.reload();
	};
	
});

personApp.controller("person_new_ctrl", function($scope, $http, $rootScope) {
	
	$scope.person = {};
	$scope.person.enabled = true;
	$scope.person.country = "Brazil";
	
	$scope.password_confirmation;
	
	$scope.states = $rootScope.states;	
	
	$http.get('/timekeeper/svc/person/types').success(function(data) {
		$scope.personTypes = data;
	});
	$http.get('/timekeeper/svc/role/list').success(function(data) {
		$scope.roles = data;
	});
	
	$http.get('/timekeeper/svc/organization/list?e=1').success(function(data) {
		$scope.orgs = data;
	});
	
	$scope.person_submit = function(person) {
		$http.post("/timekeeper/svc/person/save", person).
		    success(function(data, status, header, config) {
			    $scope.saved = true;
                $scope.error_msg = null;
                $scope.person_name = person.name;
			}).
			error(function(data, status, header, config) {
			    $scope.error_msg = data;
			});
	};
	
});

personApp.controller("person_edit_ctrl", function($scope, $http, $routeParams, $rootScope) {
	
	$http.get('/timekeeper/svc/person/'+$routeParams.personId).
	    success(function(data) {
    		$scope.person = data;
    	}).
    	error(function(data, status, header, config) {
            $scope.error_msg = data;
        });
	
	$scope.password_confirmation = null;
	$scope.states = $rootScope.states;	
	
	$http.get('/timekeeper/svc/person/types').success(function(data) {
		$scope.personTypes = data;
	});
	$http.get('/timekeeper/svc/role/list').success(function(data) {
		$scope.roles = data;
	});
	
	$http.get('/timekeeper/svc/organization/list?e=1').success(function(data) {
		$scope.orgs = data;
	});
	
	$scope.person_submit = function(person) {
		$http.post("/timekeeper/svc/person/save", person)
		    .success(function(data, status, header, config) {
		        $scope.saved = true;
                $scope.error_msg = null;
                $scope.person_name = person.name;
			}).
			error(function(data, status, header, config) {
			    $scope.error_msg = data;
					
			});
	};
	
});

personApp.controller("profile_ctrl", function($scope, $http, $routeParams, $rootScope) {
    
    $http.get('/timekeeper/svc/profile/'+$routeParams.personId).success(function(data) {
        $scope.person = data;
    });
    
    $scope.password_confirmation = null;
    $scope.states = $rootScope.states;	
    
    $scope.person_submit = function(person) {
        $http.post("/timekeeper/svc/profile/save", person).
            success(function(data, status, header, config) {
                $scope.saved = true;
                $scope.error_msg = null;
                $scope.person_name = person.name;
            }).
            error(function(data, status, header, config) {
                $scope.error_msg = data;
            });
    };
    
});
