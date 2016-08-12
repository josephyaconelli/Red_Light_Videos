import { Template } from 'meteor/templating';
import { Videos } from '../api/videos.js';
import { Meteor } from 'meteor/meteor';
import './Video_show_page.html';



//Meteor.subscribe('videos');
/*
var id = FlowRouter.getParam('_id');
console.log(Videos.findOne("XExSN6fRuji8QE4FK"));

var id = FlowRouter.getParam('_id');
var myVideo = Videos.findOne(id);
console.log(myVideo);
console.log(id);
*/

Template.Video_show_page.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var videoId = FlowRouter.getParam('videoId');
		self.subscribe('videos', postId);
		//Meteor.call("user.setTagRating", {});
	});
});

Template.Video_show_page.helpers({
	video() {
		var videoId = FlowRouter.getParam('videoId');
		var video = Videos.findOne({_id: videoId} || {});
		console.log(video);
		return video;
	}
});
