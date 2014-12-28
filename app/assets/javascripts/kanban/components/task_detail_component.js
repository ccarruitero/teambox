Kanban.TaskDetailComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['task'],
  classNameBindings: ['statusName'],
  statusName: '',
  attributeBindings: ['draggable'],
  draggable: 'true',

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
  },

  dragStart: function(e) {
    e.target.style.opacity = '0.7';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    var taskId = this.get('controller.task')._data.id;
    var classList = e.target.classList;
    var currentTaskBox = classList[classList.length - 1];
    var taskInfo = taskId + ' ' + currentTaskBox;
    console.log(taskInfo);
    e.dataTransfer.setData('taskInfo', taskInfo);
  },

  dragEnd: function(e) {
    // this event is not fired on Firefox if dataTransfer is not setted
    e.target.style.opacity = '1';
    console.log('dragEnd');
  },

  click: function(e) {
    // TODO: transition to task details
    console.log('click fired');
  }
});
