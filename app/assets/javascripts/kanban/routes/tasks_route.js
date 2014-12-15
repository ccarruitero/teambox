Kanban.TasksRoute = Ember.Route.extend({
  model: function(project_id) {
    return Kanban.Task.findQuery({projectId: project_id});
  },

  setupController: function(controller, model, project_id) {
    function filterArray(array, property, value) {
      var store = new Array();

      if ((array != null) && (array.length > 0)) {
        for (var i=0; i < array.length; i++) {
          var a = array[i];
          if (a._data[property] == value) {
            store.push(a);
          }
        };
      }

      console.log(store);
      return store;
    }

    // TODO: for some reason content is not setted in model when start so we
    // use this timeout to way this is setted. Is ugly but works for now
    setTimeout(function() {
      var backlogTasks = filterArray(model.content, 'status', 0);
      var todoTasks = filterArray(model.content, 'status', 1);
      var doingTasks = filterArray(model.content, 'status', 2);
      var doneTasks = filterArray(model.content, 'status', 3);

      controller.set('backlogTasks', backlogTasks);
      controller.set('todoTasks', todoTasks);
      controller.set('doingTasks', doingTasks);
      controller.set('doneTasks', doneTasks);
    }, 1500);

    this._super(controller, model);
  }
});
