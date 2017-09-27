Template.loginUI.events({
  "submit form": function(event, template){
     event.preventDefault();

     let email = document.getElementById('InputEmail').value
     let password = document.getElementById('InputPassword').value

     PromiseMeteorloginWithPassword(email, password)
     .catch(err => console.log(err))
  }
});
