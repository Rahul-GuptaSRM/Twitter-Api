# Twitter-Api
Rate the follower in different Categories 

# INSTRUCTIONS 

To implement this application i have used Node.js.
To start: first install all the node module by using command : 'npm install' in command prompt in project directory.

Now go to https://apps.twitter.com/ create an app and include all the tokens in /config/twitter-auth.js
Start the mongoDB, application server and go to the http://127.0.0.1:3000/.
In case any error...Check for tokens, somethings has missed out or any comma mistake from your side.
# About-Project
Start with authentication then user's screen_name get all the follower's ids(stringify). When we click on id, that follower will assessed on the basis of chirpy,influence and friends.
To assess, i have used machine learning approach(k-clustering algorithm). Initially it will get trained by the provided data and provide some mean value, on the basis on which we do the calculation and get the result. 

