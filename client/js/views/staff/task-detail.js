Template.staffTaskDetail.show = function(params) { 
  Session.set('task_id', params.id); 
  return this; 
}

Template.staffTaskDetail.NAME = function() {
  return TaskCollection.get(Session.get('task_id')).name.toUpperCase();
}

Template.staffTaskDetail.TICK = function(color) {
  return this.status === color ? "✓" : "";
}

Template.staffTaskDetail.SUBTASKS = function() {
  return TaskCollection.get(Session.get('task_id')).subtasks;
}

Template.staffTaskDetail.render = function() {   
  $('#page').html(Meteor.ui.render(Template.staffTaskDetail));
  return this;
}

Template.staffTaskDetail.events = {
  'click li.subtask-row':
    function(e) {
      if (e.target.id === "") return;
      
      var task_id = Session.get('task_id');
      var order = this.order;
      var subtasks = TaskCollection.get(task_id).subtasks;
      console.log(e.target.id + " = e.target.id")
      console.log(order + " = order")
      
      _(subtasks).each(function(subtask) { 
        if (subtask.order === order) {
          subtask.status = e.target.id;
          return;
        }
      });
      console.log(subtasks);
      Tasks.update(task_id, {$set: {subtasks: subtasks}});
    }
}