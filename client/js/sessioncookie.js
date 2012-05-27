SessionCookie = {
  updateKey: function(key) {
    $.cookie("session_key", key);
    return true;
  },
  getKey: function() {
     return $.cookie("session_key");
  }
};