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

Kanban.IndexController = Ember.ArrayController.extend({
});

Kanban.Router.map(function() {
  this.resource('task_lists',
                { path: 'projects/:project_id/task_lists'}, function() {
                  this.resource('task_list', {path: ':task_list_id'});
                });
  this.resource('tasks', { path: 'projects/:project_id/tasks'}, function() {
    this.resource('task', { path: '/:task_id'});
  });
});
