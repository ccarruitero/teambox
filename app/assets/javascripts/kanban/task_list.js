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
