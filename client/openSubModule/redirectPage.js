Template.redirectPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('StudentOne', Meteor.userId());
  });
});


Template.redirectPage.helpers({

});

Template.redirectPage.events({
  'click .btn-go': function() {
    Meteor.call('redirctToMooc', function(err,res) {
      if (err) {
        console.log(err);
      } else {
        console.log('Redirecting to: ' + res)
        // open in new window
        //window.open(res)
        //redirct current window to new address
        window.location.href = res
      }
    });
  }
})
