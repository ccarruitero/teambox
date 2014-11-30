Kanban.TaskDetailComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['task'],
  classNameBindings: ['statusName'],
  statusName: '',

  init: function() {
    this._super();
    var taskStatus = this.get('controller.task')._data.status;
    this.statusName = this.parseStatusName(taskStatus);
  },

  parseStatusName: function(status){
    if (status == 0) {
    // new
      return 'backlog';
    } else if (status == 1) {
    // open
      return 'todo';
    } else if (status == 2) {
    // hold
      return 'doing';
    } else if (status == 3) {
    // resolved
      return 'done';
    } else if (status == 4) {
    // rejected
      return 'archived';
    }
  }
});
