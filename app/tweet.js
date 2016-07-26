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
module.exports={
	send : function()
	{
		console.log('tweeting...');
		unirest.get(config.get('API.url')+'/'+config.get('API.fetch-url'))
		.send()
		.end(function(resp)
		{
			var txt=resp.body.word+':'+resp.body.meaning;
			if(txt.length>0){
				tweetImage(txt);
			}else{
				tweetText(txt);
			}
		});
	}
};

function tweetText(msg){
	console.log('tweeting',msg);
	T.post('statuses/update',{
		status : msg
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
		// console.log(imageURI);
		fs.writeFile('/var/tmp/img.txt',imageURI);
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