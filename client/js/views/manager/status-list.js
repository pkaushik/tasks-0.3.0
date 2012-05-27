Template.managerStatusList.R_COUNT = function() {
  
}

Template.managerStatusList.render = function() { 
  var BBtasks = new BBTasks(Tasks.find({}).fetch());
  
  _(Template.managerStatusList.ITEMS).each(function(row) {
      var count = BBtasks.getCountForStatus(row.id);
      row.COUNT = count ? count : false; 
  });
  
  $('#page').html(Meteor.ui.render(Template.managerStatusList));
  
  delete BBtasks;
}

Template.managerStatusList.events = {
  'click a.status-list-button': 
    function(e) {     
      //this.options.hub.trigger('list:status', { id: e.currentTarget.id });
    }
}
