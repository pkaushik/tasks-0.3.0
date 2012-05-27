Template.managerTaskList.filter = function(params) { 
  Session.set('filter', params); 
  return this; 
}

Template.managerTaskList.TASKS = function() {
  var filter = Session.get('filter');
  return filter ? TaskCollection.filter(filter) : TaskCollection.fetch();
  Session.set('filter', null);
  return this;
}

Template.managerTaskList.STAFF_NAME = function(id) {
  return id ? StaffCollection.getNameForId(id) : "Unassigned";
}

Template.managerTaskList.render = function() {   
  $('#page').html(Meteor.ui.render(Template.managerTaskList));
  return this;
}