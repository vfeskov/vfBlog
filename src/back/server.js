var express = require('express.io'),
    fs = require('fs'),
    path = require('path'),
    app = express();

app.use(express.compress());

app.use(express.favicon(__dirname + '/../front/assets/images/favicon.ico'));

app.use('/', function(){
    var staticPath = path.resolve(__dirname + '/../..') + '/',
        req = arguments[0];

    if(/_escaped_fragment_=/.test(req.url)){ // send pre-rendered content to bots
        req.url = req.url.replace(/\?.*$/,'').replace(/\/+$/,'');
        req.url += (req.url === '') ? '/index.html' : (/\./g.test(req.url) ? '' : '.html');
        staticPath += 'snapshots';
    } else {
        staticPath += 'public';
    }
    express.static(staticPath, {maxAge: 86400000}).apply(this, arguments);
});

app.get('/[^\.]+$', function(req, res){
    res.set('Content-Type', 'text/html')
        .set('Cache-Control', 'public, max-age=86400000')
        .sendfile(path.resolve(__dirname + '/../../public/index.html'));
});

app.listen(process.env.PORT || 3654);
console.log('started');