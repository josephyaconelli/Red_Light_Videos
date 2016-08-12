import { Template } from 'meteor/templating';

import './videoPlayer.html';

Template.videoPlayer.events({
		'click': function(event){
			console.log("backdop clicked");
			console.log(event);
			console.log(event.target.classList);
			if(!event.target.classList.contains('video-view')){
				$('.modal-backdrop').hide();
				FlowRouter.go('/');
			}
		},
		
		
		'keyup #videoModal': function(event){
			console.log("key up! Code: " + event.which);
			if(event.which == 27){
					$('.modal-backdrop').hide();
					FlowRouter.go('/');
			}
		}
});
