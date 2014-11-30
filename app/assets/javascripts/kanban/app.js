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

Kanban.Project = Ember.Model.extend({
  id: attr(),
  name: attr()
  // task_lists: hasMany('Kanban.TaskList', {key: })
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

Kanban.IndexRoute = Ember.Route.extend({
  model: function() {
    var projects = Kanban.Project.findAll();
    return projects;
  }
});

Kanban.Project.adapter = Ember.RESTAdapter.create();
Kanban.Project.url = "api/1/projects";
Kanban.Project.collectionKey = "objects";

Kanban.TaskListsRoute = Ember.Route.extend({
  model: function(project_id) {
    return Kanban.TaskList.findQuery({projectId: project_id});
  }
});

Kanban.TaskList = Ember.Model.extend({
  id: attr(),
  name: attr(),
  //status: DS.attr('string'),
  project: belongsTo('Kanban.Project', {key: 'project_id'})
});

Kanban.TaskList.adapter = Ember.RESTAdapter.create({
  customURL: function(klass, parentId) {
    var url = get(klass, 'url');
    var newURL = url.replace('projectId', parentId);
    return newURL;
  },

  findQuery: function(klass, records, params) {
    var self = this;
    var url = self.customURL(klass, params.projectId.project_id);

    return this.ajax(url).then(function(data) {
      self.didFindAll(klass, records, data);
      return records;
    });
  }
});

Kanban.TaskList.url = "api/1/projects/projectId/task_lists";
Kanban.TaskList.collectionKey = "objects";

Kanban.TasksRoute = Ember.Route.extend({
  model: function(project_id) {
    return Kanban.Task.findQuery({projectId: project_id});
  }
});

Kanban.Task = Ember.Model.extend({
  id: attr(),
  name: attr(),
  status: attr(),
  dueOn: attr(Date),
  assignedId: attr(),
  completedAt: attr(Date),
  project: belongsTo('Kanban.Project', {key: 'project_id'}),
  taskList: belongsTo('Kanban.TaskList', {key: 'task_list_id'}),
  user: belongsTo('Kanban.User', {key: 'user_id'})
});

Kanban.Task.adapter = Ember.RESTAdapter.create({
  customURL: function(klass, parentId) {
    var url = get(klass, 'url');
    var newURL = url.replace('projectId', parentId);
    return newURL;
  },

  findQuery: function(klass, records, params) {
    var self = this;
    var url = self.customURL(klass, params.projectId.project_id);

    return this.ajax(url).then(function(data) {
      self.didFindAll(klass, records, data);
      return records;
    });
  }
});

Kanban.Task.url = "api/1/projects/projectId/tasks";
Kanban.Task.collectionKey = "objects";

Kanban.TaskDetailComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['task'],
  classNameBindings: ['statusName'],
  statusName: '',

  init: function() {
    this._super();
    var taskStatus = this.get('controller.task')._data.status;
    this.statusName = this.parseStatusName(taskStatus);
  },

  parseStatusName: function(status){
    if (status == 0) {
    // new
      return 'backlog';
    } else if (status == 1) {
    // open
      return 'todo';
    } else if (status == 2) {
    // hold
      return 'doing';
    } else if (status == 3) {
    // resolved
      return 'done';
    } else if (status == 4) {
    // rejected
      return 'archived';
    }
  }
});
