import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import './login.html';

Template.login.events({
	'submit form'(event){
		event.preventDefault();
		var emailVar = "default";
		var passwordVar = event.target.loginPassword.value;
		
		Meteor.loginWithPassword(emailVar, passwordVar);
		
		console.log("Form Submitted");
	}
});