Task = function() {};

Task.prototype.status = function() {
  var green = 0;
  var status = "Y";

  _(this.subtasks).each(function(subtask){
    if (subtask.status === "R") { 
      status = "R";
      return;
    }
    if (subtask.status === "G") {
      green++;
    }
  });
  
  if (green === this.subtasks.length) {
    status = "G";
  }
  
  return status;
}

// Task.prototype.assigned = function() {
//   return this.assigned ? this.assigned : 'unassigned'
// }


_TaskCollection = function() {};

_TaskCollection.prototype.fetch = function() {
  return Tasks.find().fetch();
}

_TaskCollection.prototype.getTasksForStatus = function(color) {  
  return _(Tasks.find().fetch()).filter(function(task) {
    return task.status() === color ? task : false;
  });
}

_TaskCollection.prototype.getCountForStatus = function(color) {  
  var count = _TaskCollection.prototype.getTasksForStatus(color).length;
  return count ? count : false;
}

_TaskCollection.prototype.getTasksForStaff = function(id) { 
  return Tasks.find({ assigned : id }).fetch();
}

_TaskCollection.prototype.getCountForStaff = function(id) {  
  var count = _TaskCollection.prototype.getTasksForStaff(id).length;
  return count ? count : false;
}

_TaskCollection.prototype.getTasksForUnassigned = function() { 
  return Tasks.find({ assigned : { $exists : false } }).fetch();
}

_TaskCollection.prototype.getCountForUnassigned = function() {  
  var count = _TaskCollection.prototype.getTasksForUnassigned().length;
  return count ? count : false;
}

_TaskCollection.prototype.getTasksForStaffAndStatus = function(color, id) {
  var allTasksForStaff = _TaskCollection.prototype.getTasksForStaff(id);
  
  return _(allTasksForStaff).filter(function(task) {
    return task.status() === color ? task : false;
  });
}

_TaskCollection.prototype.getCountForStaffAndStatus = function(color, id) {
  var count = _TaskCollection.prototype.getTasksForStaffAndStatus(color, id).length;
  return count ? count : false;
}

_TaskCollection.prototype.filter = function(filter) {
  return (filter.status) 
  ? 
    _TaskCollection.prototype.getTasksForStatus(filter.status) 
    : 
    (filter.staff) 
    ? 
      _TaskCollection.prototype.getTasksForStaff(filter.staff) 
      :
      null;
}

TaskCollection = new _TaskCollection();

