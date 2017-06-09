Meteor.publish('ProgramsAll', function() {
  return Programs.find({});
})

Meteor.publish('ProgramsOne', function(id) {
  return Programs.find({_id:id});
})

Meteor.publish('EnrolledProgram', function(id) {
  var enrollmentList = Students.findOne({_id:id}).enrollment

  // manually adding all program id to an array
  var searchField = []

  _.forEach(enrollmentList, function(value) {
    searchField.push(value['programId'])
  })

  return Programs.find({_id:{$in:searchField}});
})

Meteor.publish('dataSelector', function(start, end) {
  return Programs.find({start_date:{$lte: start},end_date:{$gte:end}},{fields:{student:0}})
})
