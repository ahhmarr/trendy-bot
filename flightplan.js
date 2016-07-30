var plan=require('flightplan');
plan.target('production',[
	{
		host : '139.59.6.168',
		username : 'deploy',
		agent : process.env.SSH_AUTH_SOCK
	}
]);
var tmpDir='trendy_bot'+new Date().getTime();

plan.local(function(local)
{/*
	local.log('====started planning===');
	local.log('pushing master to remote ');
	var err=local.exec('git push origin master');*/
});

plan.remote(function(remote)
{
	remote.failsafe();
	remote.log('===Starting server deployment=====');
	var notExists=remote.exec('cd trendy_bot');
	if(notExists){
		remote.exec('git clone git@github.com:ahhmarr/trendy-bot.git trendy_bot');	
	}
	remote.exec('cd trendy_bot && npm install --production')
	var pmNotExists=remote.exec('cd trendy_bot && pm2 reload trendy_bot ');
	if(pmNotExists){
		remote.exec('cd trendy_bot && pm2 start bin/www -n "trendy_bot"');
	}
});