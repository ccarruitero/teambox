//= require fabric

(function(fabric) {
  var Kanban = {
    init: function() {
      this.initCanvas();
    },

    initCanvas: function() {
      console.log('init canvas');
      var canvas = new fabric.Canvas('kanban-board');
      this.createBox(canvas, 'todo', 'red', 0);
      this.createBox(canvas, 'doing', 'yellow', 212);
      this.createBox(canvas, 'done', 'green', 424);

      var url = window.location.host + '.json';
      var request = new XMLHttpRequest();
      console.log(url);
      request.open('get', url, true);
      request.responseType = 'json';
      request.send();
      var tasks = request.response
      var that = this;

      for(var i=0; i < tasks.lenght; i++) {
        var task = tasks[i]
        that.createTask(canvas, task.id, task.name, 0);
      }
    },

    createBox: function(canvas, name, color, posLeft) {
      var box = new fabric.Rect({
        id: name,
        left: posLeft,
        fill: '#fafafa',
        width: 210,
        height: 450,
        stroke: color,
        strokeDashArray: [5,5]
      });
      canvas.add(box);
    },

    createTask: function(canvas, id, desc, lastTop) {
      var task = new fabric.Rect({
        id: id,
        width: 200,
        height: 70,
        fill: 'tomato',
        top: lastTop
      });
    },

    hideColumn: function() {
      console.log('hide column');
      this.setClassStyle('column_wrap', 'none');
    },

    setClassStyle: function(name, display) {
      var column = document.getElementsByClassName(name);
      for(var i=0; i < column.length; i++) {
        column[i].style.display = display;
      }
    },

    setIdStyle: function(name, display) {
      var btn = document.getElementById(name);
      btn.style.display = display;
    },

    showBtn: function() {
      console.log('show btn');
      var that = this;
      this.setIdStyle('column-btn', 'block');
      var btn = document.getElementById('column-btn');
      btn.addEventListener('click', function() {
        that.showColumn();
      }, false);
    },

    showColumn: function() {
      this.setClassStyle('column_wrap', 'block');
      this.setIdStyle('column-btn', 'none');
    },

    setDraggables: function() {
      var tasks = document.getElementsByClassName('kanban-task');
      var that = this;
      for(var i=0; i < tasks.length; i++) {
        var elem = tasks[i]
        new Draggable(elem, {
          revert: true,
          onDrag: function() {
            console.log('position: ' + elem.offsetTop)
            console.log('position: ' + document.body.style.border-top)
          }
         })
      }
    }
  }

  var kanbanWrap = document.getElementById('kanban-board');
  if (kanbanWrap !== null) {
    Kanban.init();
  }
})(fabric);
