OptionList = function(list) {
  formattedList = []
  for (i = 0; i < list.length; i++) {
    var block = {'label':list[i], 'value':list[i]}
    formattedList.push(block)
  }
  return formattedList;
}

CountryList = function() {
  var list = []
  for (i = 0; i < Countries().length; i++) {
      var name = Countries()[i]['name'];
      var block = {'label':name, 'value':name}
      list.push(block)
  }
  return list
}

HEList = function() {
  var list = ['High School or lower', 'Bachelor degree', 'Masters Degree', 'Doctorate Degree'];
  return OptionList(list);
}

DegreeList = function() {
  var list = ['Bachelor degree', 'Masters Degree', 'Doctorate Degree'];
  return OptionList(list);
}

OccupationList = function() {
  var list = ['Accountancy, banking and finance', 'Business, consulting and management', 'Charity and voluntary work', 'Creative arts and design', 'Energy and utilities', 'Engineering and manufacturing', 'Environment and agriculture', 'Healthcare', 'Hospitality and events management', 'Information technology', 'Law', 'Law enforcement and security', 'Leisure, sport and tourism', 'Marketing, advertising and PR', 'Media and internet', 'Property and construction', 'Public services and administration', 'Recruitment and HR', 'Retail', 'Sales', 'Science and pharmaceuticals', 'Social care', 'Teacher training and education', 'Transport and logistics']
  return OptionList(list);
}

AreaOfStudyList = function() {
  var list = ['Biology', 'Business and Economics', 'Chemistry', 'Education', 'English and Communications', 'Environmental Studies', 'Fine Arts', 'History', 'International Studies', 'Languages', 'Mathematics, Computer Science and Physics', 'Medicine, Health Care and Human Performance', 'Psychology and Sociology', 'Public Affairs, Political Science and Law', 'Religion/Philosophy']
  return OptionList(list)
}

WhereHeardUsList = function() {
  var list = ['Social Network', 'Advertisement', 'Family or Friends', 'Magazine Article', 'Newspaper Story', 'TV News', 'Website/Search Engine', 'other']
  return OptionList(list)
}
