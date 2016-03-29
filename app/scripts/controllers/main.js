'use strict';

/**
 * @ngdoc function
 * @name todoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoListApp
 */
angular.module('todoListApp')
  .controller('MainCtrl', function ($scope, $location, localStorageService) {

  	if (localStorageService.get('tasks') == null) {
  		localStorageService.set('tasks', []);
  	}

    $scope.tasks = localStorageService.get('tasks');

    localStorageService.bind($scope, 'tasks');

    $scope.newTask = localStorageService.get('newTask') || '';
    localStorageService.bind($scope, 'newTask');

    $scope.inlineOptions = {
	    minDate: new Date(),
	    showWeeks: true
	 };

	$scope.dt = localStorageService.get('dt') || new Date();
	localStorageService.bind($scope, 'dt');

	$scope.format = 'dd-MMMM-yyyy';
	$scope.datePickerOpen = false;


	$scope.addTask = function () {
		if ($scope.newTask == '' || $scope.dt == '') {
			alert('Task detail or date cannot be empty');
			return;
		}
		var tasks = localStorageService.get('tasks');
		tasks.push({detail: $scope.newTask,
						   date: $scope.dt,
						   completed: false})
		localStorageService.set('tasks', tasks);
		console.log($scope.tasks);
		$location.path('/');
	}

	$scope.clearCompletedTasks = function () {
		var tasks = localStorageService.get('tasks');
		console.log(tasks)
		tasks = tasks.filter(function (task) {
			return !task.completed;
		});
		console.log('filteredtasks', tasks);
		$scope.tasks = tasks;
	}

	$scope.toggleDatePicker = function () {
		$scope.datePickerOpen = !$scope.datePickerOpen;
	}

	$scope.deleteTask = function (idx) {
		$scope.tasks.splice(idx, 1);
	}

	$scope.editTask = function (idx) {
		$scope.newTask = $scope.tasks[idx].detail;
		$scope.dt = $scope.tasks[idx].date;
		$scope.tasks.splice(idx, 1);
		$scope.tasks.splice(idx, 0, {detail: $scope.newTask,
									 completed: false,
									 date: $scope.dt})
		$scope.newTask = '';
		$location.path('/about');
	}

	$scope.back = function () {
		$location.path('/');
	}

  });
