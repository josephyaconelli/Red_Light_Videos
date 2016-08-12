import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './logoutButton.html';
Template.logoutButton.events({
	'click .logout'(event){
		event.preventDefault();
		Meteor.logout();
	}
});

Template.logoutButton.helpers({
		user(){
			return Meteor.user().username;
		}
});
