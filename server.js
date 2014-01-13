var express = require('express.io'),
    botChecker = require('./botChecker'),
    app = express();

app.use('/', function(){
    var staticPath = __dirname + '/',
        req = arguments[0];

    if(/_escaped_fragment_=/.test(req.url) || botChecker.isBot(req.get('User-Agent'))){ // send pre-rendered content to bots
        req.url = req.url.replace(/\?.*$/,'').replace(/\/+$/,'');
        req.url += (req.url === '') ? '/index.html' : (/\./g.test(req.url) ? '' : '.html');
        staticPath += 'snapshots';
    } else {
        staticPath += 'public';
    }
    express.static(staticPath).apply(this, arguments);
});

app.get('/[^\.]+$', function(req, res){
    res.set('Content-Type', 'text/html')
        .sendfile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 3654);
console.log('started');