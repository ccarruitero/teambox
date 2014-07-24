(function() {
  var Persona = {

    init: function() {
      var btn = document.getElementById('persona-signin');
      var that = this;

      navigator.id.watch({
        loggedInUser: that.loggedUser,

        onlogin: that.onLogin,

        onlogout: that.onLogout
      });

      btn.addEventListener('click', that.showPersona, false);
    },

    showPersona: function() {
      navigator.id.request();
    },

    onLogin: function(assertion) {
      var request = new XMLHTTPRequest();
      var params = {assertion: assertion};
      request.open('post', '/login', true)
      request.setRequestHeader('Content-type', 'application/json');
      request.send(params);
    }
  }
})();
