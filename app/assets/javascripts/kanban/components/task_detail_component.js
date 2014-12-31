Kanban.TaskDetailComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['task'],
  classNameBindings: ['statusName'],
  attributeBindings: ['draggable'],
  draggable: 'true',

  dragStart: function(e) {
    e.target.style.opacity = '0.7';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    var taskId = this.get('controller.task')._data.id;
    var classList = e.target.classList;
    var currentTaskBox = classList[classList.length - 1];
    var taskInfo = taskId + ' ' + currentTaskBox;
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
