_StaffCollection = function() {};

_StaffCollection.prototype.getNameForId = function(id) {
  return Users.findOne({_id: id}).name;
}

_StaffCollection.prototype.fetch = function(id) {
  return Users.find().fetch();
}

StaffCollection = new _StaffCollection();