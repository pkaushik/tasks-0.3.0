EmployeeModel = Backbone.Model.extend({
  idAttribute: '_id'
});

EmployeeCollection = Backbone.Collection.extend({
  model: EmployeeModel,
  
  getIds: function() {
    return this.pluck('_id');
  },

  getNameForId: function(id) {
    return this.get(id).get('name');
  },
  
  //needed?
  getIdForName: function(name) {
    return this.where({name: name})[0].id;
  }
});