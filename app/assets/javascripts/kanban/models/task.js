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
