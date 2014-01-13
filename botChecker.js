var userAgentsPartials = [
    'bingbot',
    'msnbot',
    'yahoo',
    'yandex',
    'googlebot',
    'gurujibot'
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