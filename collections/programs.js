import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Programs = new Mongo.Collection("program");

Programs.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, 'admin')
  },
  update: function(userId, doc) {
    return Roles.userIsInRole(userId, 'admin')
  }
})

Programs.attachSchema(new SimpleSchema({
  subject: {
    type: String,
    label: "*Program Subject"
  },
  start_date: {
    type: Date,
    label: "Start Date",
    optional: true,
    autoform: {
      type: "bootstrap-datepicker",
      datePickerOptions: {
        autoclose: true
      }
    }
  },
  end_date: {
    type: Date,
    label: "End Date",
    optional: true,
    autoform: {
      type: "bootstrap-datepicker",
      datePickerOptions: {
        autoclose: true
      }
    }
  },
  address: {
    type: String,
    label: "Lecture Address",
    optional: true
  },
  size: {
    type: Number,
    label: "Class Size",
    optional: true
  },
  qualified_to_enroll: {
    type: String,
    label: "Qualified to enroll",
    optional: true
  },
  objective: {
    type: String,
    label: "Objective",
    optional: true
  },
  contact: {
    type: String,
    label: "Contact",
    optional: true
  },
  telephone: {
    type: String,
    label: "Telephone",
    optional: true
  },
  email: {
    type: String,
    label: "Email",
    optional: true
  },
  office_address: {
    type: String,
    label: "Office Address",
    optional: true
  },
  certificate: {
    type: String,
    label: "Certificate",
    optional: true
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

    // for some strang reason, hidden element wont provoke update

    autoValue: function(){
      if (this.isInsert) {
        var id = new Meteor.Collection.ObjectID
        return id._str
      } else {
        this.unset
      }
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
    autoValue: function() {
      if (this.isInsert) {
        return false
      } else {
        this.unset
      }
    }
  },
  student: {
    type: Array,
    optional: true,
    autoform: {
      type:"hidden"
    }
  },
  'student.$':{
    type: String,
    autoform: {
      type:"hidden"
    }
  },
  createdBy: {
    type: String,
    autoValue:function(){
      if (this.isInsert) {
        return this.userId
      }
     },
     autoform: {
       type: 'hidden'
     }
  },
  createdAt: {
        type: Date,
        label: "Created At",
        defaultValue: new Date(),
        autoform: {
            type: "hidden"
        }
    }
}, { tracker: Tracker }));
