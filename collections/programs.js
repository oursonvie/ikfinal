import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Programs = new Mongo.Collection("program");

Programs.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function(userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  }
})

Programs.attachSchema(new SimpleSchema({
  subject: {
    type: String,
    label: "*Program Subject"
  },
  course: {
    type: Array,
    optional: true
  },
  'course.$':{
    type: Object
  },
  'course.$.courseId':{
    type: String,
    autoValue: function(){
      if (this.isInsert) {
        var id = new Meteor.Collection.ObjectID
        return id._str
      } else if (this.upSert) {
        var id = new Meteor.Collection.ObjectID
        return { $setOnInsert: id._str };
      }
    },
    autoform: {
        type: "hidden"
    }
  },
  'course.$.course_name':{
    type: String,
    label: "Course Name"
  },
  'course.$.course_description':{
    type: String,
    label: "Course Description",
    optional: true
  },
  'course.$.lecturer_name':{
    type: String,
    label: "Lecturer Name"
  },
  'course.$.lecturer_description':{
    type: String,
    label: "Lecturer Description",
    optional: true
  },
  'course.$.ifCheckin':{
    type: Boolean,
    label: "Lecturer Description",
    autoValue: function() {
      if (this.isInsert) {
        return false
      }
    },
    autoform: {
        type: "hidden"
    }
  }
}, { tracker: Tracker }));
