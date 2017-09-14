const express = require('express');
const app = express();
const Twit = require('twit');
const config = require('./config.js');

var pugVars = {
names:[],
profileImg:[],
screenName:[],
tweetContent:[],
retweet_count:[],
favorite_count:[],
followerProfileImg:[],
followerName:[],
followerScreenName:[],
userName:"",
senderPhoto: [],
dmText: [],
realName:"",
dateTime: []
}

var T = new Twit(config);

app.use('/static',express.static('public'));
app.set('view engine','pug');

// Name of the 1st five followed people
//*friends -profile image -real name -screenname
T.get('friends/list', { count:5 }, function(err, data, response) {
  for(let i=0;i<data.users.length;i += 1){
    pugVars.followerProfileImg[i] = data.users[i].profile_image_url;
    pugVars.followerName[i] = data.users[i].name;
    pugVars.followerScreenName[i] = data.users[i].screen_name;
  }
});

//1st five private messages
//*messages -message body -date the message was sent -time the message was sent
T.get('direct_messages', { count:5 }, function(err, data, response) {
  for(let i=0;i<data.length;i += 1){
    console.log(data[i].text);
    console.log(data[i].created_at);
    pugVars.dateTime[i] = data[i].created_at;
    pugVars.senderPhoto[i] = data[i].sender.profile_image_url;
    pugVars.dmText[i] = data[i].text;
  }
});

//1st five tweets /
//*tweets -message content -# of retweets -# of likes -date tweeted
T.get('statuses/user_timeline', { count:5 }, function(err, data, response) {
    pugVars.userName = data[0].user.screen_name;
    pugVars.realName = data[0].user.name;
    for(let i=0;i<data.length;i += 1){
      pugVars.names[i] = data[i].user.name;
      pugVars.profileImg[i] = data[i].user.profile_image_url;
      pugVars.screenName[i] = data[i].user.screen_name;
      pugVars.tweetContent[i] = data[i].text;
      pugVars.retweet_count[i] = data[i].retweet_count;
      pugVars.favorite_count[i] = data[i].favorite_count;
    }
});


app.get('/',(req,res)=>{
  res.render('index',pugVars);
});

app.listen('3000',()=>{
  console.log('The server is running on port 3000');
});
