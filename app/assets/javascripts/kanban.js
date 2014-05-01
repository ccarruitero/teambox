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

      var host = window.location.host;
      var path = window.location.pathname;
      var url = 'http://' + host + path + '.json';
      var request = new XMLHttpRequest();
      var that = this;

      console.log(url);
      request.open('get', url, true);
      request.responseType = 'json';
      request.onload = function(e) {
        var tasks = request.response
        var lastTopTodo = 4;
        var lastTopDoing = 4;
        var lastTopDone = 4;

        for(var i=0; i < tasks.length; i++) {
          var task = tasks[i].task
          if (task.status < 2) {
            that.createTask(canvas, task.id, task.name, lastTopTodo, 4);
            lastTopTodo += 71;
          } else if (task.status > 2) {
            that.createTask(canvas, task.id, task.name, lastTopDone, 428);
            lastTopDone += 71;
          } else {
            that.createTask(canvas, task.id, task.name, lastTopDoing, 216);
            lastTopDoing += 71;
          }
        }
      }

      request.send();
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

    createTask: function(canvas, id, desc, lastTop, left) {
      var text = new fabric.Text(desc, {
        fontSize: 11,
        width: 200,
        height: 70,
      });
      var bg = new fabric.Rect({
        id: id,
        width: 200,
        height: 70,
        fill: 'tomato',
      });
      var task = new fabric.Group([bg, text], {
        top: lastTop,
        left: left
      });
      canvas.add(task);
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
