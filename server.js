var express = require('express.io'),
    app = express();


app.use(express.static(__dirname + '/public'));

app.get('/snapshots[^\.]*$', function(req, res){
    var file = req.url.replace(/\?.*$/,'');
    if(file === '/snapshots/'){
        file += 'index.html'
    } else {
        file += '.html';
    }
    res.set('Content-Type', 'text/html').sendfile(__dirname + file);
});

app.get('[^\.]+$', function(req, res){
    var newUri = '/#' + req.url;
    res.redirect(newUri);
});

app.listen(process.env.PORT || 3654);
console.log('started');