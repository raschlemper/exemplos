app.directive("step", function() {
    return {
        templateUrl: 'scripts/directives/wizard/views/stepTemplate.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            titulo:"=",
            ordem:"="
        }
    }
});
