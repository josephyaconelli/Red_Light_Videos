import { Template } from 'meteor/templating';
import './logoutButton.html';
Template.logoutButton.events({
	'click .logout'(event){
		event.preventDefault();
		Meteor.logout();
	}
});