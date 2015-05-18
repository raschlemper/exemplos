'use strict';

app.directive('treeView', [function() {

    return {
        restrict: 'A',
        scope: { 
            data: "="
        },
        link: function(scope, element, attrs, ctrls) {   

            var tree = [];

            _.map(scope.data, function(value, index) {
                tree.push( { 'text': value } ); 
            });

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
            
            $(element).css('padding', '0');
            $(element).treeview({
                data: tree,
                showBorder: false
            });
        }
    }
}]);
