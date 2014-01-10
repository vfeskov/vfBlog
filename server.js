var express = require('express.io'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.get('[^\.]+$', function(req, res){
    var newUri = '/#' + req.url;
    res.redirect(newUri);
});

app.listen(process.env.PORT || 3654);
console.log('started');