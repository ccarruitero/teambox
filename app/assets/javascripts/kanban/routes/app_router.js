Kanban.Router.map(function() {
  this.resource('task_lists',
                { path: 'projects/:project_id/task_lists'}, function() {
                  this.resource('task_list', {path: ':task_list_id'});
                });
  this.resource('tasks', { path: 'projects/:project_id/tasks'}, function() {
    this.resource('task', { path: '/:task_id'});
  });
});
