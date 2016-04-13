import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import './login.html';

Template.login.events({
	'submit form'(event){
		event.preventDefault();
		var passwordVar = event.target.loginPassword.value;
		
		Meteor.loginWithPassword(passwordVar, passwordVar);
		
		console.log("Form Submitted");
	}
});