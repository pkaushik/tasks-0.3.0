Template.staffTaskList.TASKS = function() {
  return TaskCollection.fetch();
}

Template.staffTaskList.render = function() {   
  $('#page').html(Meteor.ui.render(Template.staffTaskList));
  return this;
}