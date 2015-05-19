'use strict';

app.directive('treeView', ['DataGrouperService', function( DataGrouperService ) {

    return {
        restrict: 'A',
        scope: { 
            groups: "=",
            data: "="
        },
        link: function(scope, element, attrs, ctrls) {  

            var datas = [];

            var tree = function(data, groups) {
                var group = createGrouper(data, groups)
                var groupReverse = reverseGroup(groups);
                
                var nodes = [];
                _.map(groupReverse, function(reverse, index) {
                        
                    _.map(group, function(item, itemIndex) { 

                        if(index === 0) {   
                            nodes.push(createText(item, reverse));  
                        } else {    
                            if(itemIndex === 0) {    
                                datas.push(createNode(item, reverse, nodes)); 
                                nodes = [];
                            }  
                        }

                    });

                });
                console.log(groupReverse,group,datas);
            }

            var novo = function(data, groups) {
                if(data.length == 0) return;

                var teste = [];

                var values = createValues(data, groups, null);               

                var result = _.groupBy(values, groups[0]);
                var prop = _.property(groups[0])(values);

                var result_1 = _.groupBy(result[0], 'ds_tipo_curso');
                console.log(result);

                // _.map(grouper, function(item, index) {
                    //grouper = createGrouper(data, groups, index + 1);
                    // var prop = _.property(groups[0])(item.key);
                    // var val = _.values(item.key);

                    // _.map(groups, function(group){
                    //     var prop = _.property(group)(item.key);
                    //     teste[prop];
                    //     if(hasNext(groups, group)) { 
                    //         var node = createNode(item, group, []);
                    //         console.log(node); 
                    //     } else { 
                    //         console.log(createText(item, group)); 
                    //     }                        
                    // })
                // });                

            }

            var createValues = function(data, groups, index) {
                var groupFormat = createGroupByIndex(groups, index);
                if(!groups || !data) return;
                var grouper = DataGrouperService.report(data, groupFormat);
                return _.map(grouper, function(item){
                    return item.key;
                });
            }

            var createGroupByIndex = function(groups, index) {
                var groupFormat = [];
                if(index || index == null) { index = groups.length; }
                _.map(groups, function(group, groupIndex){
                    if(groupIndex <= index) {
                        groupFormat.push(group);
                    }
                });
                return groupFormat;
                //var groupFormat = _.without(groups, *values);
            }

            var createText = function(item, group) { 
                var text = _.property(group)(item.key);
                if(!text) { text = 'S/V'; }
                return { 'text': text }                 
            }

            var createNode = function(item, group, nodes) {
                var text = _.property(group)(item.key);
                return { 'text': text, 'nodes': nodes};
            }

            var hasNext = function(groups, group) {
                var last = _.last(groups);
                if(last === group) return false;
                return true;
            }

            scope.$watch('data', function(newValue, oldValue) {
                novo(scope.data, scope.groups);
                element.css('padding', '0');
                element.treeview({
                    data: datas,
                    showBorder: false
                });
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
            
            
        }
    }
}]);
