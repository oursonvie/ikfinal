Template.adminHome.onCreated(async function(){

  let studentCount = await PromiseMeteorCall('studentsCount')
  let newsCount = await PromiseMeteorCall('newsCount')
  let programCount = await PromiseMeteorCall('programCount')

  Session.set('allCount', {
    studentCount:studentCount,
    newsCount:newsCount,
    programCount:programCount
  })

});

Template.adminHome.helpers({
  allCount: function() {
    return Session.get('allCount')
  }
});
