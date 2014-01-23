(function (angular) {
    'use strict';

    angular.module('vfAnchor')
        .directive('a', ['$location', '$anchorScroll', 'vfAnchor', function ($location, $anchorScroll, vfAnchor) {
            return {
                restrict: 'E',
                link: function (scope, element, attr) {

                    var href = element[0].getAttribute('href');
                    if(href.indexOf('#') === 0){
                        element.click(function(event){
                            var href = this.getAttribute('href'),
                                id = href.substr(1),
                                stickyHeaderHeight = parseInt(vfAnchor.getStickyHeaderHeight()),
                                idToScrollTo = id,
                                anchorEl, hiddenId, hiddenAnchorStyleAttr, hiddenAnchorEl;

                            if(stickyHeaderHeight > 0 && id){
                                anchorEl = angular.element(href);
                                hiddenId = id + '_hidden';
                                hiddenAnchorStyleAttr = stickyHeaderHeight ? ' style="top:-' + stickyHeaderHeight + 'px"' : '';
                                hiddenAnchorEl = '<span id="' + hiddenId + '" class="hidden-anchor"' + hiddenAnchorStyleAttr + '></span>';
                                anchorEl.css('position', 'relative').append(hiddenAnchorEl);
                                idToScrollTo = hiddenId;
                            }

                            setTimeout(function(){
                                $location.hash(idToScrollTo);
                                $anchorScroll();
                            }, 0);

                            event.preventDefault();
                        });
                    }
                }
            };
        }]);

}(window.angular));