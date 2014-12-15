var attr = Ember.attr;
var hasMany = Ember.hasMany;
var belongsTo = Ember.belongsTo;
var get = Ember.get;

window.Kanban = Ember.Application.create({
  rootElement: '#board',
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_BINDINGS: true
});
