BBEmployee = Backbone.Model.extend({
  idAttribute: '_id'
});

BBEmployees = Backbone.Collection.extend({
  model: BBEmployee,
  
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