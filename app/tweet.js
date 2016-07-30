var config=require('config');
var url=config.get('API.url');
var endPoint=config.get('API.fetch-url');
var unirest=require('unirest');
var twitterConfig=config.get('twitter');
var twit=require('twit');
var unirest=require('unirest');
var tim=require('text-image-merger');
var fs=require("fs");
var T=new twit(twitterConfig);
var tweetURL=url+'/'+endPoint;
module.exports={
	send : function()
	{
		console.log('tweeting...');
		console.log(tweetURL);
		unirest.get(tweetURL)
		.send()
		.end(function(resp)
		{
			var txt={heading : resp.body.word,text:resp.body.meaning};
			if(txt.text.length>140){
				tweetImage(txt);
			}else{
				tweetText(txt.heading+':'+txt.text);
			}
		});
	}
};

function tweetText(msg){
	var san=new tim.sanitize(msg);
	var text=san.removeWhiteSpace()
			.removeTags()
			.removeSpChars(':')
			.getString();
	console.log('tweeting',text);
	T.post('statuses/update',{
		status : text
	},function(err,res,data)
	{
		if(err){
			console.log(err);
		}
	})
}

function tweetImage(msg)
{
	tim.generateTextImage(msg)
	.then(function(imageURI)
	{
		uploadImage(imageURI);
	}).catch(function(err)
	{
		throw new Error(err);
	});
}

function uploadImage(imageURI){
	T.post('media/upload',{
		media_data : imageURI.substr(22)
	},function(err,data,resp)
	{
		if(err){
			console.log(err);
			return;
		}
		T.post('statuses/update',{
			media_ids : [data.media_id_string]
		},function(err,data,resp)
		{
			if(err){
				console.log(err);
			}
		})
		console.log(data.media_id_string);
	});
}