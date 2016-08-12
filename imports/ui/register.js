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
		var usernameVar = myPassword;
		Accounts.createUser({
			username: usernameVar,
			password: passwordVar,
			profile: {
				blacklist: Session.get('blackListTags')
			}
		}, function(err){
			if(!err){
				console.log("coolio!");
			}else{
				console.log("well. shit.");
				console.log(err);
			}
		});		
		
		
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
	bagTags(){
		return Session.get('blackListTags');
	}
});


function createPassword(){
	
	var password;
	
	do{
		password = generatePassword();
	}while(Meteor.call('users.exists', password));
	
	return password;
}

function generatePassword(){
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
	
	var password = capFirstLetter(color) + capFirstLetter(veggy) + capFirstLetter(animal) + num1 + "" + num2 + "" + num3;
	
	return password;
}

function capFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}
