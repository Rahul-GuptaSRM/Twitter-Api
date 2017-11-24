'use strict';

const fs = require('fs');
const kmeans = require('node-kmeans');
let rawdata = fs.readFileSync('./app/data/twitter1.JSON');
var token =  require("../../config/twitter-auth");
module.exports = function(app,ml,twit)
{

let student = JSON.parse(rawdata);
let vectors_chirrpy = new Array();
let vectors_influ = new Array();
let max_stat =0;
let max_fav = 0;
let max_listed = 0
let max_follower =0;
let max_friends = 0;

var n= student.length; 

for (let i = 0 ; i<n; i++) {

          if(max_stat  < student[i]["stat_count"])
          {
            max_stat = student[i]["stat_count"];
          }
           if(max_fav < student[i]["fav_count"])
           {
            max_fav = student[i]["fav_count"];
           }
           if(max_listed < student[i]["listed_count"])
           {
            max_listed = student[i]["listed_count"];
           }
           if(max_follower < student[i]["followers_count"])
           {
            max_follower = student[i]["followers_count"];
           } if(max_friends < student[i]["friends_count"])
           {
            max_friends = student[i]["friends_count"];
           }
         }

for (let i = 0 ; i <n; i++) {
 // vectors[i] = [student[i]["stat_count"], student[i]["fav_count"], student[i]["listed_count"]];
 vectors_chirrpy[i] = [(student[i]["stat_count"]/max_stat)*10 , (student[i]["fav_count"]/max_fav)*10 , (student[i]["listed_count"]/max_listed)*10 ];
}

for (let i = 0 ; i <n; i++) {
 vectors_influ[i] = [(student[i]["stat_count"]/max_stat)*10 , (student[i]["followers_count"]/max_follower)*10];
}

var result_chirrpy = ml.kmeans.cluster({
    data : vectors_chirrpy,
    k : 2,
    epochs: 100,
 
    distance : {type : "euclidean"}
});
var result_influ = ml.kmeans.cluster({
    data : vectors_influ,
    k : 2,
    epochs: 100,
 
    distance : {type : "euclidean"}
});
//console.log(result["means"][1]);
var x_chrippy =result_chirrpy["means"][1][0];
var y_chrippy = result_chirrpy["means"][1][1];
var z_chrippy = result_chirrpy["means"][1][2];

var x_influ =result_influ["means"][1][0];
var y_influ = result_influ["means"][1][1];
var client = new twit({

  consumer_key: token.twitterAuth.consumerKey,
  consumer_secret:token.twitterAuth.consumerSecret,
  access_token:token.twitterAuth.accessToken,
  access_token_secret: token.twitterAuth.accessTokenSecret
});
app.get('/app/rubrics',isLoggedIn,function(req,res)
{

 var a = (req.param('id'))
 var b = a.toString();
 client.get('users/show',{user_id : a},function(error,follow,response)
{

  var _listed = 0;
if(follow.listed_count != undefined)
{
   _listed= (follow.listed_count/max_listed)*10;
}
var _fav = 0;
	
  if(follow.favourites_count != undefined)
{
   _fav= (follow.favourites_count/max_fav)*10;

}

var _stat = 0;
  
  if(follow.statuses_count != undefined)
{
   _stat= (follow.statuses_count/max_stat)*10;
}


var _follow = 0;
  
  if(follow.followers_count != undefined)
{
   _listed= (follow.followers_count/max_follower)*10;
}
  var _friend = (follow.friends_count/max_friends)*10;



var x_temp1 = Math.pow(x_chrippy  - _listed,2);
var y_temp1 = Math.pow(y_chrippy - _fav,2);
var z_temp1 = Math.pow(z_chrippy - _stat,2);
var sum1 = x_temp1 + y_temp1 + z_temp1;
var sum_rt = Math.sqrt(sum1);
var x_temp2 = Math.pow(x_influ  - _follow,2);
var z_temp2 = Math.pow(y_influ - _stat,2);
var sum2 = x_temp2 + z_temp2;
var sum_influ = Math.sqrt(sum2);


if(sum_rt>4)
{
  sum_rt = 4/sum_rt;
}


if(sum_influ>4)
{
  sum_influ = 4/sum_influ;
}

if(_friend>2)
{
  _friend = 2/_friend;
}


 var data = {
    title : "Teamie",
    food : follow,
    trubric : 
    { 
      chirpy :sum_rt,
    influ : sum_influ,
    _friend : _friend
  }
  };
 res.render('../ejs/data.ejs',data);
});

})
function isLoggedIn(req,res,next)
 {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/ejs/login.ejs');
 }
};