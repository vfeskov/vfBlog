var dir = 'bower_components/',
    js = [
        {
            base: 'jquery/',
            reg: 'jquery.js',
            min: 'jquery.min.js'
        },
        {
            base: 'bootstrap/dist/js/',
            reg: 'bootstrap.js',
            min: 'bootstrap.min.js'
        },
        {
            base: 'lodash/dist/',
            reg: 'lodash.underscore.js',
            min: 'lodash.underscore.min.js'
        },
        {
            base: 'angular/',
            reg: 'angular.js',
            min: 'angular.min.js'
        },
        {
            base: 'angular-animate/',
            reg: 'angular-animate.js',
            min: 'angular-animate.min.js'
        },
        {
            base: 'angular-route/',
            reg: 'angular-route.js',
            min: 'angular-route.min.js'
        },
        {
            base: 'angular-disqus/',
            reg: 'angular-disqus.js',
            min: 'angular-disqus.min.js'
        }
    ],
    css = [
        {
            base: 'highlight.js/src/styles/',
            reg: 'idea.css',
            min: 'idea.css'
        }
    ];
module.exports = {
    js: function(type){
        var res = [];
        js.forEach(function(one){
            res.push(dir + one.base + one[type]);
        });
        return res;
    },
    css: function(type){
        var res = [];
        css.forEach(function(one){
            res.push(dir + one.base + one[type]);
        });
        return res;
    }
};