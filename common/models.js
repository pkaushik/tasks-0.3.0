Tasks = new Meteor.Collection("Tasks");
Users = new Meteor.Collection("Users");

// Tasks.models = function() {
//   var models = this.find({}).fetch();
//   _(models).each(function(task){
//     var green = 0;
//     _(task.subtasks)).each(function(subtask){
//       if (subtask.status === "R") { 
//         task.status = "R";
//         return;
//       }
//       if (subtask.status === "G") {
//         green++;
//       }
//     });
//     if (green === task.subtasks.length) {
//       task.status = "G"
//       return;
//     } 
//     task.status = "Y";
//   });
//   
//   return models;
// }
