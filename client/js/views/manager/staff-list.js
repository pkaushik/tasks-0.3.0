Template.managerStaffList.UNASSIGNED_TASK_COUNT = function() {
  return Tasks.find({ assigned : { $exists : false } }).count();
}

Template.managerStaffList.ASSIGNED_TASK_COUNTS = function() {
  var employees = Users.find().fetch();
  
  _(employees).each(function(employee){
    employee.COUNT = Tasks.find({ assigned : employee._id }).count();
  });
  
  return employees;
}

Template.managerStaffList.render = function() {   
  $('#page').html(Meteor.ui.render(Template.managerStaffList));
}

Template.managerStaffList.events = {
  'click a.staff-list-button': 
    function(e) { 
      debugger;    
      //this.options.hub.trigger('list:status', { id: e.currentTarget.id });
    }
}