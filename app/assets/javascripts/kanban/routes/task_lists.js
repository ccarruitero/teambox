Kanban.TaskListsRoute = Ember.Route.extend({
  model: function(project_id) {
    return Kanban.TaskList.findQuery({projectId: project_id});
  },

  setupController: function() {
  }
});
