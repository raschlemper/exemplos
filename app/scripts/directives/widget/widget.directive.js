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
                if (scope.type === 'table') {
                    scope.data = {
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
                          },{
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                          },{
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                          },{
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                          },{
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                          },{
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                          },{
                            'values': [{
                                'value': 'teste'
                            }, {
                                'value': 'teste1'
                            }, {
                                'value': 'teste2'
                            }, {
                                'value': 'teste3'
                            }]
                          }
                        ]
                    };
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
                console.log("Image: " + scope.type);
                if (scope.type === 'image') {
                    scope.image = true;
                }
            }

            var isTitle = function() {
                console.log("Title: " + scope.type);
                if (scope.type === 'title') {
                    scope.title = true;
                }
            }

            isTable();
            isText();
            isImage();
            isTitle();
        }
    }
}]);
