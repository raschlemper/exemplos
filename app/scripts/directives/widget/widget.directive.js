'use strict';

app.directive('widget', [function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'scripts/directives/widget/widget.template.html',
        scope: {
            data: "=",
            type: "="
        },
        link: function(scope, element, attrs, ctrls) {

            var isTable = function() {
                console.log("Table: " + scope.type);
                console.log(scope.data);
                if (scope.type === 'table') {
                   /* scope.data = {
                        'heads': [{
                            'name': 'teste'
                        }, {
                            'name': 'teste1'
                        }, {
                            'name': 'teste2'
                        }, {
                            'name': 'teste3'
                        }],
                        'rows': [{
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                        }, {
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                        }, {
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                        }, {
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                        }, {
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                        }, {
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                        }, {
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                        }]
                    };*/
                    scope.table = true;
                }
            };

            var isText = function() {
                console.log("Text: " + scope.type);
                if (scope.type === 'text') {
                    scope.text = true;
                }
            }

            var isImage = function() {
                
                if (scope.type === 'image') {
                    console.log("Image: ", scope.data);
                    scope.image = true;
                }
            }

            var isTitle = function() {
                console.log("Title: " + scope.type);
                if (scope.type === 'title') {
                    scope.title = true;
                }
            }

            var isList = function() {
                console.log("List: " + scope.type);
                if (scope.type === 'list') {
                    scope.list = true;
/*                    scope.data = [{

                        "head": "head1",
                        "value": "value1"

                    }, {

                        "head": "head2",
                        "value": "value2"

                    }, {

                        "head": "head3",
                        "value": "value3"

                    }, {

                        "head": "head4",
                        "value": "value4"

                    }];*/
                }
            }

            isTable();
            isText();
            isImage();
            isTitle();
            isList();
        }
    }
}]);
