//= require fabric

(function(fabric, Ajax) {
  var Kanban = {
    init: function() {
      this.initCanvas();
    },

    initCanvas: function() {
      var that = this;
      var canvas = new fabric.Canvas('kanban-board');
      this.tasksStatus = [];

      this.createBox(canvas, 'todo', 'red', 0);
      this.createBox(canvas, 'doing', 'yellow', 212);
      this.createBox(canvas, 'done', 'green', 424);

      var host = window.location.host;
      var path = window.location.pathname;
      var url = 'http://' + host + path + '.json';

      new Ajax.Request(url, {
        method: 'get',
        onSuccess: function(response) {
          that.insertTasks(response.responseJSON, canvas);
        }
      });
    },

    insertTasks: function(response, canvas) {
      var tasks = response;
      var indexEnd = window.location.pathname.indexOf('/', 10);
      var project = window.location.pathname.slice(10, indexEnd);
      this.lastTopTodo = 4;
      this.lastTopDoing = 4;
      this.lastTopDone = 4;
      var that = this;

      for(var i=0; i < tasks.length; i++) {
        var task = tasks[i]['task']
        if (task.status < 2) {
          that.createTask(canvas, task.id, project, task.name, that.lastTopTodo, 4, task.status);
          that.lastTopTodo += 72;
        } else if (task.status > 2) {
          that.createTask(canvas, task.id, project, task.name, that.lastTopDone, 428, task.status);
          that.lastTopDone += 72;
        } else {
          that.createTask(canvas, task.id, project, task.name, that.lastTopDoing, 216, task.status);
          that.lastTopDoing += 72;
        }
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

    createTask: function(canvas, id, projectId, desc, lastTop, left, tStatus) {
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
        projectId: projectId
      });
      var task = new fabric.Group([bg, text], {
        top: lastTop,
        left: left
      });
      this.observeMovingEnd(task, canvas);
      canvas.add(task);

      var task = {};
      task.id = id;
      task.status = tStatus;
      this.tasksStatus.push(task);
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

    observeMovingEnd: function(elem, canvas) {
      var that = this;
      elem.on('modified', function() {
        that.checkPosition(elem, canvas);
      });
    },

    centerTask: function(elem, oldStatus, newStatus, canvas) {
      var task = elem;
      var that = this;

      if (newStatus > 2) {
        var taskTop = that.lastTopDone;
        var taskLeft = 428;
        that.lastTopDone += 72
      } else if (newStatus < 2) {
        var taskTop = that.lastTopTodo;
        var taskLeft = 4;
        that.lastTopTodo += 72
      } else {
        var taskTop = that.lastTopDoing;
        var taskLeft = 216;
        that.lastTopDoing += 72
      }

      if (oldStatus > 2) {
        that.lastTopDone -= 72
      } else if (oldStatus < 2) {
        that.lastTopTodo -= 72
      } else {
        that.lastTopDoing -= 72
      }

      task.setTop(taskTop);
      task.setLeft(taskLeft);
      task.setCoords();
      //canvas.renderAll();
    },

    updateTask: function(url, params, object, expectedStatus, canvas) {
      var that = this;
      var taskId = object._objects[0].id;
      var currentStatus = null;

      for(var i=0; i< that.tasksStatus.length; i++) {
        if (that.tasksStatus[i].id === taskId) {
          currentStatus = that.tasksStatus[i].status;
          break;
        }
      }

      if (that.currentStatus !== expectedStatus) {
        new Ajax.Request(url, {
          method: 'put',
          parameters: params,
          onSuccess: function(response) {
            for(var i=0; i< that.tasksStatus.length; i++) {
              if (that.tasksStatus[i].id === taskId) {
                that.tasksStatus[i].status = response.responseText;
                console.log('task');
                console.log(that.tasksStatus[i]);
                that.centerTask(object, currentStatus, expectedStatus ,canvas);
                break;
              }
            }
          },
          onFailure: function(request, transport) {
            console.log('something wrong');
            console.log(request);
          }
        });
      }
    },

    checkPosition: function(elem, canvas) {
      var object = elem;
      var elCenter = object.get('left') + 100;
      var that = this;
      var taskId = object._objects[0].id;
      var projectId = object._objects[0].projectId;
      var host = window.location.host;
      var path = '/projects/' + projectId + '/tasks/' + taskId + '/update_status';
      var url = 'http://' + host + path;


      if (elCenter > 428) {
        console.log('task is done.. ');
        var params = {"status": 3}
        that.updateTask(url, params, object, 3, canvas);
      } else if (elCenter > 216) {
        console.log('task is doing .. ');
        var params = {"status": 2}
        that.updateTask(url, params, object, 2);
      } else {
        console.log('task is todo.. ');
        var params = {"status": 1}
        that.updateTask(url, params, object, 1);
      }
    },
  }

  var kanbanWrap = document.getElementById('kanban-board');
  if (kanbanWrap !== null) {
    Kanban.init();
  }
})(fabric, Ajax);
