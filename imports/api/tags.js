import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Check } from 'meteor/check';

export const Tags = new Mongo.Collection('tags');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tags', function tagsPublication() {
    return Tags.find({});
  });
}

Meteor.methods({
	'tags.insert'(_text){
		//check(_text,String);
		
		Tags.upsert({text: _text})
	},
	'tags.insertAll'(_tags){
		//check(_tags, Array);
		
	/*	_tags.forEach(function(element, index){
			Tags.upsert({text: element});
		});
		*/
		for(var i = 0; i < _tags.length; i++){
			Tags.upsert( { text: _tags[i] }, {text: _tags[i] });
		}
		
	}
});
