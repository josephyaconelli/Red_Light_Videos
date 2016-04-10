import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Tags } from '../api/tags.js';
import { Session } from 'meteor/session';

import './register.html';
import './tag.js';

Meteor.subscribe('tags');

var myPassword = createPassword();

Template.register.events({
	'submit form'(event){
		event.preventDefault();
		var passwordVar = myPassword;
		var usernameVar = "default";
		Accounts.createUser({
			username: usernameVar,
			password: passwordVar
		});		
		
		if(Meteor.user){
			console.log("worked!");
		}else{
			console.log("didn't work :(");
		}
		
		//Meteor.call('tags.insertAll', Session.get('blackListTags'));
		
		console.log("Form Submitted");
	}
});

Template.register.helpers({
	password(){
		return myPassword;
	},
	
	tags(){
		return Tags.find({});
	},
	
	badTags(){
		return Session.get('blackListTags');
	}
});

function createPassword(){
	
	var colors = ["red",
					"green",
					"blue",
					"grey",
					"purple",
					"yellow",
					"pink",
					"brown",
					"black",
					"white",
					"indigo",
					"navy",
					"rose",
					"gold",
					"silver",
					"cream",
					"violet",
					"orange"];
	var veggies = ["bean",
					"corn",
					"cucumber",
					"melon",
					"potato",
					"eggplant",
					"strawberry",
					"beet",
					"carrot",
					"onion",
					"pea",
					"garlic",
					"pepper",
					"banana",
					"coconut",
					"orange",
					"blueberry",
					"kiwi",
					"cherry",
					"pear",
					"peach",
					"grape",
					"plum",
					"pineapple",
					"mango",
					"blackberry"];
	var animals = ["wolf",
					"tiger",
					"puma",
					"lion",
					"coyote",
					"bear",
					"panda",
					"dog",
					"cat",
					"monkey",
					"owl",
					"duck",
					"donkey",
					"baboon",
					"cow",
					"bulldog",
					"couger",
					"fish",
					"starfish",
					"rabbit",
					"mouse",
					"deer",
					"polarbear",
					"rhino",
					"hippo",
					"fox",
					"penguin",
					"horse",
					"giraffe",
					"parrot",
					"pig"];
					
	var color = colors[Math.floor(Math.random()*(colors.length))]
	var veggy = veggies[Math.floor(Math.random()*(veggies.length))]
	var animal = animals[Math.floor(Math.random()*(animals.length))]
	var num1 = Math.floor(Math.random()*(10));
	var num2 = Math.floor(Math.random()*(10));
	var num3 = Math.floor(Math.random()*(10));
	
	var password = color + veggy + animal + num1 + "" + num2 + "" + num3;
	
	return password;
}
