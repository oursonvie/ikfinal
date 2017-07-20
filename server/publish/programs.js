Meteor.publish('ProgramsAll', function() {
  return Programs.find({});
})

Meteor.publish('ProgramsOne', function(id) {
  return Programs.find({_id:id});
})

Meteor.publish('EnrolledProgram', function(id) {

  try {
    var enrollmentList = Students.findOne({_id:id}).enrollment
  } catch(err) {
    console.log(err)
  }


  // manually adding all program id to an array
  var searchField = []

  _.forEach(enrollmentList, function(value) {
    searchField.push(value['programId'])
  })

  return Programs.find({_id:{$in:searchField}});
})

// return only avaliable courses
Meteor.publish('dataSelector', function(start, end) {

  // get today's date
  var currentDate = moment().format("YYYY-MM-DD")
  // the start date have to -1 to make sure the result is right
  var start = moment(currentDate).add(1,'days').toDate()
  var end = moment(currentDate).toDate()

  return Programs.find({start_date:{$lte: start},end_date:{$gte:end}},{fields:{student:0}})
})
