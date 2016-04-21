angular.module('experiences').controller('ExperiencesController', ['$scope','$routeParams', '$location', 'Authentication', 'Experiences','Enrollments','EnrollmentsCourse',
    function($scope, $routeParams, $location, Authentication, Experiences, Enrollments, EnrollmentsCourse){
        $scope.authentication = Authentication;
        
        $scope.create = function(){
            var experience = new Experiences({
                /*company_name: this.company_name,
                city: this.city,
                country: this.country,
                position: this.position,
                start_date: this.start_date,
                end_date: this.end_date,                
                details: this.details*/
                name: this.name,
                code: this.code,
                professor: this.professor
            });
    
        experience.$save(function(response){
            console.log(response);
            $location.path('experiences/' + response._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.createEnroll = function(){
            var enrollment = new Enrollments({
                course: this.experience
            });
            console.log(enrollment);
    
        enrollment.$save(function(response){
            console.log(response);
            $location.path('enrollments');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.find = function(){
            $scope.experiences = Experiences.query();
        };
        
        $scope.findOne = function(){
            $scope.experience = Experiences.get({
                experienceId:$routeParams.experienceId
            });
        };
        
        $scope.findEnroll = function(){
            $scope.enrollments = Enrollments.query();
        };
        
        $scope.findOneEnroll = function(){
            $scope.enrollment = Enrollments.get({
                enrollmentId:$routeParams.enrollmentId
            });
            console.log($scope.enrollment);
            console.log($routeParams.enrollmentId);
        };
        
         $scope.findStudent = function(){
             console.log($routeParams.courseId);
            $scope.enrollments = EnrollmentsCourse.query({
                courseId:$routeParams.courseId
            });
        };
        
        $scope.update = function(){
            $scope.experience.$update(function(){
                $location.path('experiences/' + $scope.experience._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.updateEnroll = function(){
            console.log($scope.enrollment);
            $scope.enrollment.$update(function(){
                $location.path('enrollment/' + $scope.enrollment._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.delete = function(experience){
            console.log(experience);
            if(experience){
                experience.$remove(function(){
                    for(var i in $scope.experiences){
                        if($scope.experiences[i] === experience){
                            $scope.experiences.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.experience.$remove(function(){
                    $location.path('experiences');
                });
            }
        };
    }
]);
