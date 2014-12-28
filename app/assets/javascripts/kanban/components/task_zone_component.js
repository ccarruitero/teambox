Kanban.TaskZoneComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['task-box'],

  dragEnter: function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.classList.contains('task-box')) {
      e.target.classList.add('over');
    }
  },

  dragOver: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  dragLeave: function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.remove('over');
  },

  drop: function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.remove('over');
    if (e.target.classList.contains('task-box')) {
      var taskInfo = e.dataTransfer.getData('taskInfo');
      var taskId = taskInfo.match(/\w/)[0];
      var regs = /\s(\w+)/.exec(taskInfo);
      var lastStatusName = regs[regs.length - 1];
      console.log(taskId);
      var statusToUpdate = this.get('title')
      this.sendAction('action', taskId, statusToUpdate, lastStatusName);
    }
  }
});
