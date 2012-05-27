//TODO add auth filters here to DRY code and put these methods in classes
//TODO throw meaningful HTTP errors instead of return false

Meteor.methods({
  createUser: createUser,
  deleteUser: deleteUser,
  updateUserName: updateUserName,
  updateUserPassword: updateUserPassword,
  updateSetting: updateSetting,
  createTask: createTask,
  deleteTask: deleteTask,
  login: loginUser,
  logout: logoutSession,
  sessionUser: sessionUser
});


function createUser(args) {
  if(user = _checkAuth(args.auth)) {
    //strip out what we don't need
    if (args.manager) {
      if (_isUser(args.manager)) {
        user = {name: args.name, username: args.username, password: args.password, manager: args.manager};
      } else {
        return false;
      }
    } else {
      console.log('got here')
      user = {name: args.name, username: args.username, password: args.password};
    }
    _createUser(user);
    return true;
  }
  return false;
}

function deleteUser(args) {
  if(user = _checkAuth(args.auth)) {
    Users.remove({_id: args.id});
    return true;
  }
  return false;
}

function updateUserName(args) {
  if(user = _checkAuth(args.auth)) {
    Users.update({_id: user.id}, {$set: {name: args.name}});
    return true;
  }
  return false;
}

function updateUserPassword(args) {
  if(user = _checkAuth(args.auth)) {
    if(_hashPassword(args.current_password, user.salt) == user.password) {
      Users.update({_id: user.id}, {$set: {password: _hashPassword(args.password, user.salt)}});
      return true;
    }
  }
  return false;
}

function updateSetting(args) {
  if(user = _checkAuth(args.auth)) {
    _.each(args.settings, function(setting) {
      Settings.update({key: setting[0]}, {$set: {value: setting[1]}});
    });
    return true;
  }
  return false;
}

function createTask(args) {
  if (user = _checkAuth(args.auth)) {
    if (_isUser(args.manager)) {
      if (args.assigned) {
        if (_isUser(args.assigned)) {
          task = {name: args.name, subtasks: args.subtasks, manager: args.manager, assigned: args.assigned};
        } else {
          return false; // invalid assigned
        }
      } else {
        task = {name: args.name, subtasks: args.subtasks, manager: args.manager};
      }
      _createTask(task);
      return true;
    }
    return false; // invalid manager
  }
  return false; // invalid user
}

function deleteTask(args) {
  if(user = _checkAuth(args.auth)) {
    Tasks.remove({_id: args.id});
    return true;
  }
  return false;
}

function loginUser(username, password) {
  user = Users.findOne({username: username});
  if (user) {
    if(user.password == _hashPassword(password, user.salt)) {
      //Filter what is sent to the client, this can be then stored in a cookie safely
      thisUser = {name: user.name, username: user.username }; 
      if (user.staff) {
        thisUser['staff'] = user.staff;
      }
      sessionKey = Session.set(thisUser); //Set session data - do not send auth in session data
      thisUser['auth'] = sessionKey;
      return thisUser; // return auth to client
    }
  }
  throw new Meteor.Error(401, 'Login not correct');
  return false;
}

function logoutSession(key) {
  return Session.delete(key); //Delete the session key
}

//Returns to the client what is stored in the session, 
//don't do this if you are storing things in the session the client should not know
function sessionUser(key) {
  sessionKey = Session.get(key);
  if(sessionKey) {
    return sessionKey.data;
  }
  return false;
}

// Private methods
function _checkAuth(auth) {
  sessionData = Session.get(auth); //Get session data
  if(sessionData) {
    return Users.findOne({username: sessionData.data.username}); //Make sure there is a user with this id
  } else {
    return false;
  }
}

function _hashPassword(password, salt) {
  return Crypto.SHA256(salt + '-' + password);
}

function _createUser(vals) {
  vals.salt = Crypto.SHA256(Math.random().toString());
  vals.password = _hashPassword(vals.password, vals.salt);
  vals.created = new Date();
  id = Users.insert(vals);
  return id;
}

function _createTask(vals) {
  vals.created = new Date();
  id = Tasks.insert(vals);
  return id;
}

function _isUser(id) {
  return Users.findOne({_id: id});
}

// ?
function _setSetting(key, value, description) {
  if(!Settings.findOne({key: key})) {
    Settings.insert({
      key: key,
      value: value,
      description: description
    });
  }
}



// function updateTaskSubtask(args) {
//   if(user = _checkAuth(args.auth)) {
//     task = Tasks.findOne({_id: args.id});
//     if(task) {
//       Posts.update({slug: args.slug}, {$set: {
//           title: args.title,
//           body: args.body
//         } 
//       });
//     } else {
//       Posts.insert({
//         title: args.title,
//         body: args.body,
//         slug: args.slug,
//         userId: user._id,
//         created: new Date()
//       });
//     }
//     return true;
//   }
//   return false;
// }


// Anyone can take this action - not just a user 
// function makeComment(args) {
//   if(args && args.postId) {
//     Comments.insert({
//       postId: args.postId,
//       name: args.name,
//       comment: args.comment,
//       created: new Date()
//     });
//   }
// }



