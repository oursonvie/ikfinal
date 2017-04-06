Template.newsList.helpers({
  clean: function(content) {
    return content.replace(/<(?:.|\n)*?>/gm, '').substring(0,400) + ' ...';
  }
})
