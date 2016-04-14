import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Check } from 'meteor/check';


export const UserInfo = new Mongo.Collection('userinfo');

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('userInfo', function userInfoPublication() {
          return UserInfo.find({user: this.userId}, {blacklist:1});
        });
	
	
}


Meteor.methods({
	'user.addToBlacklist'(userId, tag){
		check(userId, String);
		check(tag, String);
		
		if(! Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		
		UserInfo.upsert( {user: userId}, { $push: { blacklist: tag } });
	},
	'user.addAllToBlacklist'(userId, tags){
		check(userId, String);
		check(tags, Array);
		
		
		if(! Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		
		UserInfo.upsert( { user: userId }, { $addToSet: { tags: { $each: tags } } });
	},
	
 });

