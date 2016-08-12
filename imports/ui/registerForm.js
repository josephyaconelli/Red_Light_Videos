import { Template } from 'meteor/templating';

import './registerForm.html';
import './loginForm.html';

		
Template.registerForm.events({
		'click': function(event){
			console.log("backdop clicked");
			console.log(event);
			console.log(event.target.classList);
			if(!event.target.classList.contains('register-view')){
				$('.modal-backdrop').hide();
				FlowRouter.go('/');
			}
		},
		
		
		'keyup #registerModal': function(event){
			console.log("key up! Code: " + event.which);
			if(event.which == 27){
					$('.modal-backdrop').hide();
					FlowRouter.go('/');
			}
		}
});
