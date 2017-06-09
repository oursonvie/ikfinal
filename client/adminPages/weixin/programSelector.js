Template.programSelector.onCreated(function() {
    var self = this;

    self.autorun(function() {
        self.subscribe('dataSelector');
    });
});

Template.programSelector.helpers({
  programs: function() {
    return Programs.find()
  },
  ifCheckin: function() {
    return this.ifCheckin
  }
})

Template.programSelector.events({
  'click .btn-select': function() {
    var status = !this.ifCheckin
    Meteor.call('startCheckin',this.courseId, status)
  }
})
