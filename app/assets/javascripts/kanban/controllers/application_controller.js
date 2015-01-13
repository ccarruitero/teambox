Kanban.TasksController = Ember.ArrayController.extend({
  init: function() {
    var self = this;
    this.get('socket.client').onmessage = function(evt) {
      var obj = JSON.parse(evt.data);
      var task = Kanban.Task.find(obj.taskId);
      self.updateTaskStatusUI(obj.lastStatus, obj.newStatus, task);
    };
    this._super();
  },

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
        taskToMove = task;
      }
    }

    return taskToMove;
  },

  updateTaskStatusUI: function(lastStatusName, newStatusName, task) {
    this.get(lastStatusName + 'Tasks').removeObject(task);
    this.get(newStatusName + 'Tasks').addObject(task);
  },

  actions: {
    updateTaskStatus: function(taskId, newStatusName, lastStatusName) {
      // update backend
      var task = this.getTaskInTaskBox(lastStatusName, taskId);
      var parsedStatus = this.parseStatus(newStatusName);
      task.set('status', parsedStatus);
      task.save();
      // update client
      var lastBox = this.get(lastStatusName + 'Tasks');
      var index = lastBox.indexOf(task);
      this.updateTaskStatusUI(lastStatusName, newStatusName, task);
      var obj = {
                  type: 'update',
                  taskId: taskId,
                  newStatus: newStatusName,
                  lastStatus: lastStatusName
                };
      this.get('socket.client').send(JSON.stringify(obj));
    }
  }
});
