import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Students = new Mongo.Collection("student");

Students.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
})

let StudentSchema = new SimpleSchema({
  full_name: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.full_name'))
    },
    autoform: {
      group: 'Basic Information'
    }
  },
  gender: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.gender'))
    },
    autoform: {
      group: 'Basic Information',
      type: "select-radio-inline",
      options: () => {
        return[
          {label: TAPi18n.__('general.male'), value:"Male"},
          {label: TAPi18n.__('general.female'), value:"Female"}
        ]
      }
    }
  },
  date_of_birth: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.date_of_birth'))
    },
    autoform: {
      group: 'Basic Information',
      type: "bootstrap-datepicker",
      datePickerOptions: {
        autoclose: true
      }
    }
  },
  telephone: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.telephone'))
    },
    autoform: {
      group: 'Basic Information'
    }
  },
  email: {
    type: String,
    label: "Email",
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return Meteor.user().emails[0].address
        }
      } else {
        this.unset()
      }
    },
    autoform:{
      type: 'hidden'
    }
  },
  country_of_birth: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.country_of_birth'))
    },
    autoform: {
      group: 'Citizenship',
      type: "select",
      options: function(){return CountryList()}
    }
  },
  country_of_citizenship: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.country_of_citizenship'))
    },
    autoform: {
      group: 'Citizenship',
      type: "select",
      options: function(){return CountryList()}
    }
  },
  passport: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.passport'))
    },
    autoform: {
      group: 'Citizenship'
    }
  },
  highest_education: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.highest_education'))
    },
    autoform: {
      group: 'Education History',
      type: "select",
      options: function(){return HEList()}
    }
  },
  area_of_study: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.area_of_study'))
    },
    autoform: {
      group: 'Education History',
      type: "select",
      options: function(){return AreaOfStudyList()}
    }
  },
  name_of_institute: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.name_of_institute'))
    },
    optional: true,
    autoform: {
      group: 'Education History'
    }
  },
  university_name: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.university_name'))
    },
    autoform: {
      group: 'Current Study'
    }
  },
  studentid: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.studentid'))
    },
    autoform: {
      group: 'Current Study'
    }
  },
  degree: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.degree'))
    },
    autoform: {
      group: 'Current Study',
      type: "select",
      options: function(){return DegreeList()}
    }
  },
  department: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.department'))
    },
    autoform: {
      group: 'Current Study'
    }
  },
  occupation: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.occupation'))
    },
    optional: true,
    autoform: {
      group: 'Other',
      type: "select",
      options: () => {
        return OccupationList()
      }
    }
  },
  source: {
    type: String,
    label: () => {
      return (TAPi18n.__('autoformstudent.source'))
    },
    optional: true,
    autoform: {

      group: 'Other',
      type: "select-radio-inline",
      options: function(){return WhereHeardUsList()}
    }
  },
  enrollment: {
      type: Array,
      optional: true,
      autoform: {
        type:"hidden"
      }
  },
  'enrollment.$': {
      type: Object
  },
  'enrollment.$.programId':{
    type: String,
    label: "Program ID",
    autoform: {
        type:"hidden"
    }
  },
  'enrollment.$.status':{
    type: String,
    label: "Program Status",
    autoform: {
        type:"hidden"
    }
  },
  userId: {
    type: String,
    autoValue:function(){
      if (this.isInsert) {
        return this.userId
      } else {
        this.unset()
      }
     },
     autoform: {
       type: 'hidden'
     }
  },
  programNo:{
    type: Number,
    optional: true,
    autoform: {
      type:"hidden"
    }
  },
  import:{
    type: Boolean,
    optional: true,
    autoform: {
      type:"hidden"
    }
  },
  profile_image:{
    type: String,
    optional: true,
    autoform: {
      type:"hidden"
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date
      }
    },
     autoform: {
       type: 'hidden'
     }
  }
}, { tracker: Tracker })

Students.attachSchema(StudentSchema);
