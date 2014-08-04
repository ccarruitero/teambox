(function(Ajax) {
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

      this.getCurrentUser();
    },

    showPersona: function() {
      navigator.id.request();
    },

    onLogin: function(assertion) {
      var url = '/auth/persona';

      new Ajax.Request(url,
        method: 'post',
        parameters: {assertion: assertion},
        onSuccess: function(response) {
          window.location.replace('/');
          console.log('you are authenticated with persona');
        },
        onFailure: function(request, transport) {
          console.log('something wrong');
          console.log(response);
        }
      );
    },

    onLogout: function() {
      new Ajax.Request: function('/logout') {
        method: '/get',
        onSuccess: function() {
          window.location.reload();
          console.log('your are logged out');
        },

        onFailure: function() {
          console.log('something wrong when trying to logout');
          console.log(response);
        }
      }
    },

    getCurrentUser: function() {
      new Ajax.Request('/account',
        method: 'get',
        onSuccess: function(response) {
          console.log('successful current user')
        },
        onFailure: function(request, transport) {
          console.log('something wrong getting current user');
          console.log(response);
        }
      );
    }
  }

  Persona.init();
})(Ajax);
