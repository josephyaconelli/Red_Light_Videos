import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session';

import './tag.html';

Template.tag.events({
	'change .blacklist-tag input'(event){
		var badTags = Session.get('blackListTags');
		
		Array.prototype.remove = function(value){
			var idx = this.indexOf(value);
			if(idx != -1){
				return this.splice(idx, 1);
			}
			return false;
		};
		
		if(event.target.checked){
			badTags.push(this.text);
		}else{
			badTags.remove(this.text);
		}
		
		Session.set('blackListTags', badTags);
	}
});