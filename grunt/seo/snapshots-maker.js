// code taken from http://www.yearofmoo.com/2012/11/angularjs-and-seo.html
var system = require('system');
var url = system.args[1] || '';
if(url.length > 0) {
    var page = require('webpage').create();
    page.open(url, function (status) {
        if (status == 'success') {
            var delay, checker = (function() {
                var html = page.evaluate(function () {
                    var body = document.getElementsByTagName('body')[0];
                    if(body.getAttribute('data-status') == 'ready') {
                        return document.getElementsByTagName('html')[0].outerHTML;
                    }
                });
                if(html) {
                    clearTimeout(delay);
                    //removing scripts and styles, crawlers don't need them
                    html = html.replace(/<script[^>]*>[^№]*?<\/script>/gm, '').replace(/^<style>[^№]*?^<\/style>/gm, '');
                    console.log(html);
                    phantom.exit();
                }
            });
            delay = setInterval(checker, 100);
        }
    });
}