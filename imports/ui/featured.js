import { Template } from 'meteor/templating';
import { Videos } from '../api/videos.js';
import { Meteor } from 'meteor/meteor';
import './featured.html';

Meteor.subscribe('videos', null);

var elemNum = 0;
var elemNum2 = 0;

Template.featured.helpers({
	featuredVideo(){
			return Videos.find({}, { sort: { createdAt: -1 }, limit:5 });
			elemNum = 0;
	},
	activeClass1(){
		if(elemNum == 0){
			elemNum++;
			return "active";
		}
		elemNum++;
		return "";
	},
	activeClass2(){
		if(elemNum2 == 0){
			elemNum2++;
			return "active";
		}
		elemNum2++;
		return "";
	}
});
