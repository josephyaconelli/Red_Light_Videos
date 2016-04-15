

FlowRouter.route('/videos/:videoId', {
	name: 'Videos.show',
	action(params){
		BlazeLayout.render('App_body', {main: 'Video_show_page'});
		console.log("on the videos page: " + params.videoId);
		
	}
});
