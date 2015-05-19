'use strict';

app.directive('treeView', [function() {

    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template: '<li ng-repeat="data in getData()">{{data}}</li>',
        scope: { 
            data: "="
        },
        link: function(scope, element, attrs, ctrls) {   

            var tree = [];    

            scope.getData = function() {
                lista();
                return scope.data;
            }        

            var lista = function() {
                _.map(scope.data, function(value, index) {
                    console.log(value, index);
                    tree.push( { 'text': value } ); 
                });
            }

            // var tree = [
            //   {
            //     text: "Parent 1",
            //     nodes: [
            //       {
            //         text: "Child 1",
            //         nodes: [
            //           {
            //             text: "Grandchild 1"
            //           },
            //           {
            //             text: "Grandchild 2"
            //           }
            //         ]
            //       },
            //       {
            //         text: "Child 2"
            //       }
            //     ]
            //   },
            //   {
            //     text: "Parent 2"
            //   },
            //   {
            //     text: "Parent 3"
            //   },
            //   {
            //     text: "Parent 4"
            //   },
            //   {
            //     text: "Parent 5"
            //   }
            // ];
            
            element.css('padding', '0');
            element.treeview({
                data: tree,
                showBorder: false
            });
        }
    }
}]);
