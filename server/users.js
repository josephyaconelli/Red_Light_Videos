Meteor.methods({
	'users.exists'(name){
		if(Meteor.users.findOne({username: name})){
			return true;
		}else{
			return false;
		}
	}
});