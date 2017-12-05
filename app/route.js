var User = require("./passport");
var  token = require("../config/twitter-auth");
module.exports=function(app,passport,Twit)
{

var client = new Twit({

  consumer_key: token.twitterAuth.consumerKey,
  consumer_secret:token.twitterAuth.consumerSecret,
  access_token:token.twitterAuth.accessToken,
  access_token_secret: token.twitterAuth.accessTokenSecret
});

app.get('/auth/twitter',
  passport.authenticate('twitter'));
    app.get('/login/twitter/return',
        passport.authenticate('twitter', {
            successRedirect : '/app',
            failureRedirect : '/'
        }));



  app.get('/app',isLoggedIn,function(req,res)
{
  res.cookie("key", "ghjg");
  var a = req.param('data');
var user_name = req.user["twitter"]["username"];

var use = user_name.toString();
if(a == undefined)
{
  a = -1;
}

// calling the twitter api
client.get('followers/ids',{screen_name :use, cursor : a, stringify_ids : true},function(error,follow,response)
 {
var data = {

    title : "Teamie",
    food : follow["ids"],
    prev : follow["previous_cursor_str"],
    next : follow["next_cursor_str"]
  };
     res.render('../ejs/show.ejs',data);
});

});

app.get('/logout', function(req, res) {
 cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }

       // req.logout();
        res.redirect('/');
    });

  
};

// check whether user is loggedin or not
 function isLoggedIn(req,res,next)
 {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
 }