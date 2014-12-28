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
  customURL: function(klass, parentId, id) {
    var url = get(klass, 'url');
    var newURL = url.replace('projectId', parentId);
    if (!Ember.isEmpty(id)) {
      return newURL + '/' + id;
    } else {
      return newURL;
    }
  },

  findQuery: function(klass, records, params) {
    var self = this;
    var url = self.customURL(klass, params.projectId.project_id);

    return this.ajax(url).then(function(data) {
      self.didFindAll(klass, records, data);
      return records;
    });
  },

  saveRecord: function(record) {
    var self = this;
    var primaryKey = get(record.constructor, 'primaryKey');
    var url = self.customURL(record.constructor, record._data.project_id, get(record, primaryKey));
    var objToUpdate = {};
    var dirties = record._dirtyAttributes;
    for (var i=0; i < dirties.length; i++) {
      objToUpdate[dirties[i]] = record.get(dirties[i]);
    }

    return this.ajax(url, objToUpdate, "PUT").then(function(data) {
      self.didSaveRecord(record, data);
      return record
    });
  }
});

Kanban.Task.url = "api/1/projects/projectId/tasks";
Kanban.Task.collectionKey = "objects";
