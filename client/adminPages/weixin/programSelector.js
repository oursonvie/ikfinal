Template.programSelector.onCreated(function() {
    var self = this;

    // get today's date
    var currentDate = moment().format("YYYY-MM-DD")
    // the start date have to -1 to make sure the result is right
    var start_date = moment(currentDate).add(1,'days').toDate()
    var end_end = moment(currentDate).toDate()

    self.autorun(function() {
        self.subscribe('dataSelector', start_date, end_end);
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
