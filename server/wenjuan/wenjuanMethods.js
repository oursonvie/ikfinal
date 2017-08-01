Meteor.methods({
  updateFormProjList:function(){
    let elements = Meteor.call('getProjList').project_list
    let list = []
    _.forEach(elements, function(element) {
      let block = {'label': element.title, 'value': element.short_id}
      list.push(block)
    })

    Variables.remove({name: 'autoFormProjList'})

    Variables.insert({
      name: 'autoFormProjList',
      value: list
    })

  }
});
