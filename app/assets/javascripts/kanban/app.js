var attr = Ember.attr;
var hasMany = Ember.hasMany;
var belongsTo = Ember.belongsTo;
var get = Ember.get;

Ember.Application.initializer({
  name: 'websocket',

  initialize: function(container, application) {
    application.deferReadiness()
    var socketURL = 'ws://' + window.location.host;
    var socketClient = new WebSocket(socketURL);

    socketClient.onopen = function () {
      var socket = {
        client: socketClient
      };

      application.set('Socket', socket);
      application.register('socket:main', socket, {instantiate: false});
      application.inject('route','socket', 'socket:main');
      application.inject('controller','socket', 'socket:main');

      application.advanceReadiness();
    };
  }
});

window.Kanban = Ember.Application.create({
  rootElement: '#board',
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_BINDINGS: true
});
