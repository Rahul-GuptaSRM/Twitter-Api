module.exports = {

 'twitterAuth' : {
        'consumerKey'       : process.env.TWITTER_KEY || 'Give your consumerKey',
        'consumerSecret'    :  process.env.TWITTER_SECRET || 'Give your consumerSecret',
        'accessToken'       :process.env.TWITTER_SECRET ||'Give your accessToken',
        'accessTokenSecret' : process.env.TWITTER_SECRET ||'Give your accessTokenSecret',
        'callbackURL'       : 'http://127.0.0.1:3000/login/twitter/return'//or you can change with your's
    }
};

