Meteor.publish("Tasks", function(username) {
  var id = Users.findOne({username: username})._id;
  return Tasks.find({$or: [{manager: id}, {assigned: id}]});
});

Meteor.publish("Users", function(username) {
  return Users.find({username: {$ne : username}}, {fields: {username: 0, password: 0, salt: 0, created: 0, role: 0}});
});