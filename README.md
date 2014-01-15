## VF Personal Site

Website optimized for search engines and fast load.

<a href="http://phantomjs.org/">PhantomJS</a> is required to run `grunt seo`.

## Prerequisites

You'll need <a href="http://nodejs.org/" target="_blank">NodeJS</a>, <a href="https://npmjs.org/" target="_blank">NPM</a> and <a href="http://phantomjs.org/">PhantomJS</a> installed.
Several NPM modules are required too, type following commands into terminal to install them:

```
npm install -g bower
npm install -g grunt-cli
```

## Installation

To run the website on `http://localhost:3654` go to the website's root and run this commands:

```
npm install
bower install
grunt
npm start
```

## Setup on Linux server with Forever and Nginx

Go to the root directory of the website and type following in terminal:

```
npm install -g forever
forever start server.js
```

Nginx config:

```
server {
        listen          80;
        server_name     yourdomain.com;
        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;
                proxy_pass http://127.0.0.1:3654/;
                proxy_redirect off;
        }
}
```

## License

The MIT License

Copyright (c) 2014 Vladimir Feskov http://vladimirfeskov.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.