angular.module('experiences').factory('Experiences', ['$resource', function($resource){
    return $resource('api/experiences/:experienceId', {
        experienceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('enrollments').factory('Enrollments', ['$resource', function($resource){
    return $resource('api/enrollment/:enrollmentId', {
        enrollmentId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('enrollmentscourse').factory('EnrollmentsCourse', ['$resource', function($resource){
    return $resource('api/enrollmentcourse/:courseId', {
        experienceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);