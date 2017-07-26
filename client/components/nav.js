Template.nav.helpers({

  languages() {
    const obj = TAPi18n.getLanguages();
    const languages = [];
    for (const key in obj) {
      if (key) languages.push({ code: key, labels: obj[key] });
    }
    if (languages) return languages;
  },

  currentLanguage() {
    const currentLanguageCode = TAPi18n.getLanguage();
    const appLanguages = TAPi18n.getLanguages();
    for (const code in appLanguages) {
      if (code === currentLanguageCode) return appLanguages[code].name;
    }
  }
});

Template.nav.events({
  'click .changeLang' () {
    // console.log(this.code)
    TAPi18n.setLanguage(this.code);
    accountsUIBootstrap3.setLanguage(this.code);
    Meteor.call('setLang', Meteor.userId(), this.code)
  }

});
