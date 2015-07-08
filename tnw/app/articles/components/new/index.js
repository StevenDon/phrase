'use strict';

var fs = require('fs');
module.exports = {
    url: '/new',
    controller: ['$scope', 'articles', 'classrooms', '$stateParams', '$state', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, articles, classrooms, $stateParams, $state, controller) {

    classrooms.list().then(function(classRes) {
        $scope.classrooms = classRes;
    });

    $scope.create = function(article) {
        articles.create(article).then(function(res) {
            $state.go('articles.list')
        });
    };
}
