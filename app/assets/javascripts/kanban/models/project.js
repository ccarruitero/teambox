Kanban.Project = Ember.Model.extend({
  id: attr(),
  name: attr()
  // task_lists: hasMany('Kanban.TaskList', {key: })
});

Kanban.Project.adapter = Ember.RESTAdapter.create();
Kanban.Project.url = "api/1/projects";
Kanban.Project.collectionKey = "objects";
