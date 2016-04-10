import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { UserInfo } from './userinfo.js';

export const Videos = new Mongo.Collection('videos');

console.log(this.userId);

if (Meteor.isServer) {
  // This code only runs on the server


  
  Meteor.publish('videos', function videosPublication() {
	var blackList = UserInfo.find({user: this.userId}, {blacklist: 1});
	console.log(blackList.blacklist);
    return Videos.find({tags: { $nin: ["test1", "test2"] }}, {sort: { createdAt: -1 } })
  });
}


Meteor.methods({
	'videos.insert'(_title, _url, _tags, _thumbnail){
		check(_title, String);
		check(_url, String);
		check(_tags, Array);
		check(_thumbnail, String);
		
		if(! Meteor.userId()){
			//throw new Meteor.Error("not-authorized");
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
