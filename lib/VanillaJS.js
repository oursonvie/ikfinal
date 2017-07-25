OptionList = function(list) {
  formattedList = []
  for (i = 0; i < list.length; i++) {
    var block = {'label':TAPi18n.__('optionlists.'+list[i]), 'value':list[i]}
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

HEArrayList = ['High_School_or_lower', 'Bachelor_degree', 'Masters_Degree', 'Doctorate_Degree'];

HEList = function() {
  return OptionList(HEArrayList);
}

DegressArrayList = ['Bachelor_degree', 'Masters_Degree', 'Doctorate_Degree'];

DegreeList = function() {
  return OptionList(DegressArrayList);
}

OccupationArrayList = ['Accountancy_banking_and_finance','Business_consulting_and_management','Charity_and_voluntary_work','Creative_arts_and_design','Energy_and_utilities','Engineering_and_manufacturing','Environment_and_agriculture','Healthcare','Hospitality_and_events_management','Information_technology','Law','Law_enforcement_and_security','Leisure_sport_and_tourism','Marketing_advertising_and_PR','Media_and_internet','Property_and_construction','Public_services_and_administration','Recruitment_and_HR','Retail','Sales','Science_and_pharmaceuticals','Social_care','Teacher_training_and_education','Transport_and_logistics']

OccupationList = function() {
  return OptionList(OccupationArrayList);
}

AreaOfStudyArrayList = ['Biology','Business_and_Economics','Chemistry','Education','English_and_Communications','Environmental_Studies','Fine_Arts','History','International_Studies','Languages','Mathematics_Computer_Science_and_Physics','Medicine_Health_Care_and_Human_Performance','Psychology_and_Sociology','Public_Affairs_Political_Science_and_Law','Religion_Philosophy']

AreaOfStudyList = function() {
  return OptionList(AreaOfStudyArrayList)
}

WhereHeardUsArrayList = ['Social_Network', 'Advertisement', 'Family_or_Friends', 'Magazine_Article', 'Newspaper_Story', 'TV_News', 'Website/Search_Engine', 'other']

WhereHeardUsList = function() {
  return OptionList(WhereHeardUsArrayList)
}
