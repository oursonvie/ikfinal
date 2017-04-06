Template.addNews.rendered = function() {
  $('#summernote').summernote({
    height: 600
  });
}

Template.addNews.events({
  'click .btn-submit': function(){
    event.preventDefault();
    var html = $('#summernote').summernote('code');
    var title = $('#blog_title').val()
      if ($('#summernote').summernote('isEmpty') || title.length==0) {
        Bert.alert('Cannot insert empty content', 'danger', 'growl-top-right');
      }
      else {
        var result = News.insert({
          title: title,
          content: html,
          createdAt: new Date,
          createdBy: Meteor.userId()
        })
        Bert.alert('content insert as ' + result, 'success', 'growl-top-right');

        var html = $('#summernote').summernote('reset');
        $('#blog_title').val('')
      }

  }
})
