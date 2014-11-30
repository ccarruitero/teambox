Kanban.Project = Ember.Model.extend({
  id: attr(),
  name: attr()
  // task_lists: hasMany('Kanban.TaskList', {key: })
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
