(function(angular){
    'use strict';

    angular.module('vfBlog.posts')
        .factory('Posts', ['$http', '$q', function($http, $q){
            function getAll (){
                return $http.get('/posts.json').then(function(data){
                    return data.data;
                });
            }
            function getBy (key, val){
                var deferred = $q.defer(),
                    promise = deferred.promise;
                getAll().then(function(data){
                    var i = data.length;
                    while(i--){
                        if(data[i][key] === val){
                            data[i].contentUrl = '/posts_content/' + data[i].slug + '.html';
                            deferred.resolve(data[i]);
                            break;
                        }
                    }
                });
                return promise;
            }
            function getById (id){
                return getBy('id', id);
            }
            function getBySlug (slug){
                return getBy('slug', slug);
            }
            return {
                getAll: getAll,
                getById: getById,
                getBySlug: getBySlug
            };
        }]);
}(window.angular));