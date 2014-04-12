(function(scheme){

  var wrbSocketClient = {

    init: function(conversationId) {
      console.log('init wrbsockets')
      var uri = scheme + window.document.location.host + "/";
      var ws = new WebSocket(uri);
      var that = this;

      ws.onopen = function() {
        console.log('open socket');
        var message = 'init connection';
        var conversation_id = document
        this.setMessage('start', message, conversationId);
        ws.send(JSON.stringify(this.msg));
      } 

      ws.onmessage = function(msg) {
        if (msg.type === 'comment') {
          console.log('message is received');
          var message = msg.message;
          var wrapEl = document.getElementById('thread_conversation_' + msg.conversation_id);
          that.updateComments(message, wrapEl);
        }
      };
    },
  
    msg: {},
  
    setMessage: function(type, message, conversationId) {
      this.msg.type = type;
      this.msg.message = message;
      this.msg.conversation_id = conversationId;
    },

    generateToken: function() {
    },

    renderCommnets: function(conversation_id) {
    }

    updateComments: function(msg, wrapEl) {
      // insert msg in commentTemplate, and all in wrapEl
      var comment = document.createElement('div');
      var message = document.createTextNode(msg.message);
      //comment.setAttribute('id', 'comment_' + comment_id);
      comment.setAttribute('class', 'comment');
      comment.appendChild(message)
      wrapEl.appendChild(comment)
    },

    sendMessage: function() {
      // get message
      var message = document.getElementById('message');
      this.setMessage('comment', message.value)
      ws.send(JSON.stringify(this.msg));
      message.value = '';
      this.msg = '';
    }
  }

  var form = document.getElementsByClassName('new_comment');
  form.addEventListener('submit', function() {
    console.log('event added to form submit');
    wrbSocketClient.init(form.getAttribute('data-conversation-id'));
  });
})(scheme);
