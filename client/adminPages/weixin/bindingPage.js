Template.bindingPage.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('WeixinBinding', Meteor.userId());
    });
});

Template.bindingPage.helpers({
  WXAccounts: function() {
    return WXAccounts.find({})
  },
  ifAdmin: function() {
    return this.bindInformation.admin
  },
  bindStatus: function() {


    if(!this.bindInformation) {
      return 'New'
    } else {

      var bindInformation = this.bindInformation

      if (bindInformation.vertified) {
        return 'Vertified'
      } else if (bindInformation.email) {
        return 'Pending'
      } else {
        return 'Init'
      }

    }

  }
})

Template.bindingPage.events({
  'click .btn-pending': function() {
    Meteor.call("WXStatus", Meteor.userId(), this._id)

  }
})
