Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-edit-profile': function(event) {
		FlowRouter.go('me');
	},
	'click #login-buttons-my-program': function(event) {
		FlowRouter.go('myProgram');
	}
});
