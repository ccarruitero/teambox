Kanban.IndexRoute = Ember.Route.extend({
  model: function() {
    var projects = Kanban.Project.findAll();
    return projects;
  }
});

