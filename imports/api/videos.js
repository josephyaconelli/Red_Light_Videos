import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { UserInfo } from './userinfo';


export const Videos = new Mongo.Collection('videos');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('videos', function videosPublication(id) {
	if(id !== null){
		return Videos.find({_id: String(id)}, {sort: { createdAt: -1 }, limit: 1 });
	}else{
		console.log("video publication sent");
		return Videos.find({}, {sort: { createdAt: -1 }});
	}
  });
}


Meteor.methods({
	'videos.insert'(_title, _url, _tags, _thumbnail){
		check(_title, String);
		check(_url, String);
		check(_tags, Array);
		check(_thumbnail, String);
		
		if(! Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		
		Videos.insert({
			title: _title,
			url: _url,
			tags: _tags,
			thumbnail: _thumbnail,
			createdAt: new Date(),
		});
	},
	'videos.remove'(videoId){
		check(videoId, String);
		
		Videos.remove(videoId);
	}
});
