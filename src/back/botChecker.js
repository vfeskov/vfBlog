var userAgentsPartials = [
    //'bingbot',
    //'yahoo',
    //'yandex',
    //'googlebot',
];
module.exports = {
    isBot: function(userAgent){
        var isBot = false,
            lcUserAgent = userAgent.toLowerCase();
        userAgentsPartials.forEach(function(botPartial){
            if(lcUserAgent.indexOf(botPartial) > -1){
                isBot = true;
            }
        });
        return isBot;
    }
};
