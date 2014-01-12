(function(angular){
    'use strict';

    // the highlight.js library (http://highlightjs.org/) is required and can be included to html using these lines:
    // <link rel="stylesheet" href="http://yandex.st/highlightjs/7.3/styles/idea.min.css" />
    // <script src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>
    angular.module('vfCodeHighlighting', [])
        .directive('code', [function(){
            return {
                restrict: 'E',
                link: function(scope, element){
                    //remove extra indentation caused by parent tags formatting
                    var lines, offset;
                    lines = angular.element(element).text().split( '\n' );
                    if ( lines.length > 1 && lines[ 0 ].trim() === '' ) {
                        lines.shift();
                    }
                    offset = lines[ 0 ].match( /^\s*/ )[ 0 ].length;
                    lines = lines.map( function ( line ) {
                        return line.slice( offset );
                    });
                    element.text( lines.join( '\n' ) );
                    // apply highlight.js lib
                    hljs.highlightBlock(element[0]);
                }
            };
        }]);
}(window.angular));