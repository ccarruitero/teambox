var attr = Ember.attr;
var hasMany = Ember.hasMany;
var belongsTo = Ember.belongsTo;
var get = Ember.get;

window.Kanban = Ember.Application.create({
  rootElement: '#board',
  LOG_MODULE_RESOLVER: true
});

Kanban.Project = Ember.Model.extend({
  id: attr(),
  name: attr()
  // task_lists: hasMany('Kanban.TaskList', {key: })
});

Kanban.IndexController = Ember.ArrayController.extend({
});

Kanban.Router.map(function() {
  this.resource('task_lists', { path: 'projects/:project_id/task_lists'});
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
  //assignedId: attr(Number),
  //dueOn: attr(Date),
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
