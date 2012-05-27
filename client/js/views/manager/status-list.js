Template.managerStatusList.R_COUNT = function() {
  var count = Template.managerStatusList.getTasksForStatus('R').length;
  return count ? count : false;
}

Template.managerStatusList.Y_COUNT = function() {
  var count = Template.managerStatusList.getTasksForStatus('Y').length;
  return count ? count : false;
}

Template.managerStatusList.G_COUNT = function() {
  var count = Template.managerStatusList.getTasksForStatus('G').length;
  return count ? count : false;
}

Template.managerStatusList.getTasksForStatus = function(color) {  
   var ret =  _(Tasks.find().fetch()).filter(function(task) {
    return task.status() === color.toUpperCase() ? task : false;
  });
  return ret;
}

Template.managerStatusList.render = function() {   
  $('#page').html(Meteor.ui.render(Template.managerStatusList));
}

Template.managerStatusList.events = {
  'click a.status-list-button': 
    function(e) {    
      //this.options.hub.trigger('list:status', { id: e.currentTarget.id });
    }
}