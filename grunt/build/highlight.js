var cheerio = require('cheerio'),
    hljs = require('highlight.js');
module.exports = function(content){
    var $ = cheerio.load(content);
    $('pre code').each(function(){
        var $this = $(this);
        if($this.attr('class')){
            try {
                $this.html(hljs.highlight($this.attr('class'), $this.html()).value);
            } catch(e){
                $this.html(hljs.highlightAuto($this.html()).value);
            }
        } else {
            $this.html(hljs.highlightAuto($this.html()).value);
        }
    });
    return $.html();
};