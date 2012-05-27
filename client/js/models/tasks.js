BBTask = Backbone.Model.extend({
  idAttribute: '_id',
  
  defaults: {
      'assigned': 'unassigned'
  },
  
  initialize: function(options) {
    this.setStatus();
    this.on('change:subtasks', this.subtasksChanged, this);
    this.on('change:assigned', this.assignedChanged, this);
  },

  subtasksChanged: function() {
    this.setStatus();
    return this;
  },

  assignedChanged: function() {
    this.collection && this.collection.sort();
    return this;
  },

  setStatus: function() {
    var green = 0;
    var status = "Y";

    _(this.get('subtasks')).each(function(subtask){
      if (subtask.status === "R") { 
        status = "R";
        return;
      }
      if (subtask.status === "G") {
        green++;
      }
    });
    if (green === this.get('subtasks').length) {
      status = "G";
    }
    this.set({status: status}); 
    return this;
  }
});

BBTasks = Backbone.Collection.extend({
  model: BBTask,

  comparator: function(model) {
    return model.get('assigned');
  },

  getTasksForStatus: function(status) {   
    return _(this.where({'status' : status.toUpperCase()})).map(function(model){ return model.toJSON() });
  },

  getCountsGroupedByStatus: function() {
    var a = this.groupBy(function(model) {return model.get('status')});
    return _.zip(_(a).keys(), _(a).values());
  },
  
  getCountForStatus: function(status) {
    return this.getTasksForStatus(status).length;
  },
  
  getCountsGroupedByEmployee: function() {
    var a = this.groupBy(function(model) {return model.get('assigned')});
    return _.zip(_(a).keys(), _(a).values());
  },

  getTasksForEmployee: function(employee) {
    return _(this.where({'assigned' : employee})).map(function(model){ return model.toJSON() });
  },

  getCountForEmployee: function(employee) {
    return this.where({'assigned' : employee}).length;
  },

  getTasksForUnassigned: function() {
    return _(this.where({'assigned' : 'unassigned'})).map(function(model){ return model.toJSON() });
  },
  
  getCountForUnassigned: function() {
    return this.where({'assigned' : 'unassigned'}).length;
  },
  
  getTasksForAssigned: function() {
    return _(this.filter(function(model){ if ( model.get('assigned') !== 'unassigned') return true }))
      .map(function(model){ return model.toJSON() });
  },
  
  getCountForAssigned: function() {
    return this.length - this.getCountForUnassigned();
  },

  getStatusCountForEmployee: function(status, employee) {
    return this.where({'assigned' : employee, 'status' : status}).length;
  }
});
