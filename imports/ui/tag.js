import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'

import './tag.html';

Template.tag.events({
	'change .blacklist-tag input'(){
		Meteor.call('user.addToBlacklist', this.text);
	}
});