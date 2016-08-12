import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import { Videos } from '../api/videos.js';
import { Session } from 'meteor/session';
import { UserInfo } from '../api/userinfo.js';
import { Accounts } from 'meteor/accounts-base';

import './video.js';
import './body.html';
import './loginForm.js';
import './logoutButton.js';
import './App_body.html';
import './Video_show_page.js';
import './registerForm.js';
import './videoPlayer.js';
import './featured.js';



var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['title'];

VideoSearch = new SearchSource('videos', fields, options);




Template.searchResult.helpers({
  getVideos: function() {
    return VideoSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {createdAt: -1}
    });
  },
  
  isLoading: function() {
    return VideoSearch.getStatus().loading;
  }
});



FlowRouter.route('/video/:videoId', {
	name: 'Video.show',
	action(params){
		BlazeLayout.render('App_body', {main: 'videoPlayer'});
		console.log('video player loaded for: ' + params.videoId); 	
	},
	triggersEnter: [openModal]
});

function openModal(context, redirect, stop){
	console.log("trigger fired!: " + context.path.indexOf("register"));
	if(context.path.indexOf("register") == 1){
		Template.registerForm.rendered = function(){
			$('#registerModal').modal('show');
			console.log("Modal rendered...");
		}
	}else if(context.path.indexOf("video") != -1){
		var video = context.params.videoId;
		
		console.log("trigger called for " + video);
		console.log(context);
		Template.videoPlayer.rendered = function(){
				$('#videoModal').modal('show');
		}
	}
	
}


FlowRouter.route('/register', {
	name: 'Register.show',
	action(params){
		BlazeLayout.render('App_body', {main: 'registerForm'});
		console.log('register form loaded');
	},
	triggersEnter: [openModal]
});

FlowRouter.route('/add', {
	name: 'Video.show',
	action(params){
		BlazeLayout.render('App_body', {main: 'addVideo'});
		console.log('add video loaded');
	}
});

FlowRouter.route('/', {
	name: 'Video.show',
	action(params){
		BlazeLayout.render('App_body', {main: 'videoThumbs'});
		console.log('home page loaded');
	}
});


Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    VideoSearch.search(text);
  }, 200)
});



Template.videoPlayer.helpers({
	video(){
		return Videos.findOne({ _id: FlowRouter.getParam('videoId')  });
	}
});

Accounts.onLogin(function(){
	console.log("logged in as " + Meteor.user().username);
	console.log("tags i don't like: " + Meteor.user().profile.blacklist);
	Session.set("blackListTags", Meteor.user().profile.blacklist);
//	Meteor.subscribe('videos', Meteor.user().profile.blacklist, Meteor.userId());
	
});
 
Template.body.onCreated(function bodyOnCreated(){ 
	if(Session.get('blackListTags') !== undefined){
		console.log("blacklist not set yet");
	}else{
		Session.set('blackListTags', []);
	}

	this.state = new ReactiveDict();
	console.log(Session.get('blackListTags'));
	Meteor.subscribe('videos', null);
});
 
Template.body.helpers({
  videos(){
	  const instance = Template.instance();
	  if(instance.state.get('hideTriggers')){
		  return Videos.find({tags: { $nin: ["boob", "ass"] }}, {sort: { createdAt: -1 } });
	  }
	if(Session.get('blackListTags') !== undefined){
	  return Videos.find({ tags: { $nin: Session.get('blackListTags') }  }, { sort: { createdAt: -1 }});
}else{
	return Videos.find({}, { sort: { createdAt: -1 }});
}
  },

  
  
});



Template.body.events({
	'submit .new-video'(event){
		
		event.preventDefault();
		
		const target = event.target;
		const _title = target.title.value;
		const _url = target.url.value;
		var _tags = target.tags.value;
		const _thumbnail = target.thumbnail.value;
		
		_tags = _tags.split(",");
		
		Meteor.call('videos.insert', _title, _url, _tags, _thumbnail);
		
		Meteor.call('tags.insertAll', _tags);
		
		target.title.value = "";
		target.url.value = "";
		target.thumbnail.value = "";
		target.tags.value = "";
		
		
	},
	'change .hide-triggers input'(event, instance){
		instance.state.set('hideTriggers', event.target.checked);
	}
	
});
