Kanban.TasksController = Ember.ArrayController.extend({
  parseStatus: function(statusName) {
    if (statusName == 'backlog') {
      return 0
    } else if (statusName == 'todo') {
      return 1
    } else if (statusName == 'doing') {
      return 2
    } else if (statusName == 'done') {
      return 3
    }
  },

  getTaskInTaskBox: function(statusName, taskId) {
    var tasks = this.get(statusName + 'Tasks');
    var taskToMove;

    for (var i=0; i < tasks.length; i++) {
      var task = tasks[i];
      if (task.get('id').toString() === taskId) {
        console.log('task was found');
        taskToMove = task;
      }
    }

    return taskToMove;
  },

  actions: {
    updateTaskStatus: function(taskId, newStatusName, lastStatusName) {
      console.log('event fired from controller since need access to model');
      // update backend
      var task = this.getTaskInTaskBox(lastStatusName, taskId);
      var parsedStatus = this.parseStatus(newStatusName);
      task.set('status', parsedStatus);
      task.save();
      // update client
      // this._super();
      // update before task box
      var lastBox = this.get(lastStatusName + 'Tasks');
      var index = lastBox.indexOf(task);
      this.get(lastStatusName + 'Tasks').splice(index, 1);
      // update new task box
      this.get(newStatusName + 'Tasks').pushObject(task);
    }
  }
});
