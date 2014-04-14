(function(Draggable, Element) {
  var Kanban = {
    init: function() {
      this.hideColumn();
      this.showBtn();
      this.setDraggables();
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

  var kanbanWrap = document.getElementById('kanban-wrapper');
  if (kanbanWrap !== null) {
    setTimeout(function() {
      Kanban.init();
    }, 3000);
  }
})(Draggable, Element);
