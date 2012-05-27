Template.managerStatusList.R_COUNT = function() {
  return TaskCollection.getCountForStatus('R');
}

Template.managerStatusList.Y_COUNT = function() {
  return TaskCollection.getCountForStatus('Y');
}

Template.managerStatusList.G_COUNT = function() {
  return TaskCollection.getCountForStatus('G');
}

Template.managerStatusList.render = function() {   
  $('#page').html(Meteor.ui.render(Template.managerStatusList));
}