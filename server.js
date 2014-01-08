var express = require('express.io'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);
console.log('started');