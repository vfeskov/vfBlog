var express = require('express.io'),
    botChecker = require('./seo/botChecker'),
    app = express();

app.use(express.compress());

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
    express.static(staticPath, {maxAge: 86400000}).apply(this, arguments);
});

app.get('/[^\.]+$', function(req, res){
    res.set('Content-Type', 'text/html')
        .set('Cache-Control', 'public, max-age=86400000')
        .sendfile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 3654);
console.log('started');