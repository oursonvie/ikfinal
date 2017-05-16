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

Students.attachSchema(new SimpleSchema({
  full_name: {
    type: String,
    label: "*Full Name",
    autoform: {
      group: 'Basic Information'
    }
  },
  gender: {
    type: String,
    label: "*Gender",
    autoform: {
      group: 'Basic Information',
      type: "select-radio-inline",
      options: function() {return[{label:"Male",value:"Male"},{label:"Female",value:"Female"}]}
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  date_of_birth: {
    type: String,
    label: "*Date of Birth",
    autoform: {
      group: 'Basic Information',
      type: "bootstrap-datepicker",
      datePickerOptions: {
        autoclose: true
      }
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  telephone: {
    type: String,
    label: "*Telephone",
    autoform: {
      group: 'Basic Information'
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
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
    label: "*Country of Birth",
    autoform: {
      group: 'Citizenship',
      type: "select",
      options: function(){return CountryList()}
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  country_of_citizenship: {
    type: String,
    label: "*Country of Citizenship",
    autoform: {
      group: 'Citizenship',
      type: "select",
      options: function(){return CountryList()}
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  passport: {
    type: String,
    label: "*Passport No.",
    autoform: {
      group: 'Citizenship'
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  highest_education: {
    type: String,
    label: "*Highest Education",
    autoform: {
      group: 'Education History',
      type: "select",
      options: function(){return HEList()}
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  area_of_study: {
    type: String,
    label: "*Area of Study",
    autoform: {
      group: 'Education History',
      type: "select",
      options: function(){return AreaOfStudyList()}
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  name_of_institute: {
    type: String,
    label: "Name of Institute",
    optional: true,
    autoform: {
      group: 'Education History'
    }
  },
  university_name: {
    type: String,
    label: "*University Name",
    autoform: {
      group: 'Current Study'
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  studentid: {
    type: String,
    label: "*Student No.",
    autoform: {
      group: 'Current Study'
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  degree: {
    type: String,
    label: "*Degree",
    autoform: {
      group: 'Current Study',
      type: "select",
      options: function(){return DegreeList()}
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  major: {
    type: String,
    label: "*Major",
    autoform: {
      group: 'Current Study',
      type: "select",
      options: function(){return AreaOfStudyList()}
    },
    autoValue:function(){
      if (this.isInsert) {
        if (this.value != undefined) {
          return this.value
        } else {
          return 'null'
        }
      } else {
        this.unset()
      }
    }
  },
  occupation: {
    type: String,
    label: "Occupation",
    optional: true,
    autoform: {
      group: 'Other',
      type: "select",
      options: function(){return OccupationList()}
    }
  },
  source: {
    type: String,
    label: "Where did you find us?",
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
    defaultValue: new Date,
     autoform: {
       type: 'hidden'
     }
  }
}, { tracker: Tracker }));
