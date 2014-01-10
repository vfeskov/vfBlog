var express = require('express.io'),
    app = express();


app.use('/', function(req, res){
    var file
    if(/_escaped_fragment_=/.test(req.url)){
        file = req.url.replace(/\?.*$/,'');
        if(file === '/'){
            file += 'index.html';
        } else {
            file += '.html';
        }
        console.log(file);
        res.set('Content-Type', 'text/html').sendfile(__dirname + '/snapshots' + file);
        return;
    } else {
        express.static(__dirname + '/public').apply(this, arguments);
    }
});

app.get('/[^\.]+$', function(req, res){
    res.set('Content-Type', 'text/html').sendfile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 3654);
console.log('started');