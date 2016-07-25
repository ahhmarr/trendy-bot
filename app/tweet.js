var config=require('config');
var url=config.get('API.url');
var endPoint=config.get('API.fetch-url');
var unirest=require('unirest');
var twitterConfig=config.get('twitter');
var twit=require('twit');
var unirest=require('unirest');

module.exports={
	send : function()
	{
		console.log('tweeting...');
		unirest.get(config.get('API.url')+'/'+config.get('API.fetch-url'))
		.send()
		.end(function(resp)
		{
			tweet(resp.body.word+':'+resp.body.meaning);
		});
	}
}

function tweet(msg){
	console.log('tweeting',msg);
	var T=new twit(twitterConfig);
	T.post('statuses/update',{
		status : msg
	},function(err,res,data)
	{
		
	})
}