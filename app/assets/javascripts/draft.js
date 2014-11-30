// http://en.wikipedia.org/wiki/Monad_%28functional_programming%29
// http://discuss.emberjs.com/t/problem-using-custom-rest-adapter-for-one-of-the-app-models/4240
// http://stackoverflow.com/questions/17938294/how-do-you-create-a-custom-adapter-for-ember-js
// http://eviltrout.com/2013/03/23/ember-without-data.html
// http://blog.sensible.io/2013/06/26/ember-model-introduction.html

/*
Kanban.Store = DS.Store.extend({
  adapter: DS.RESTAdapter.extend({
    namespace: 'api/1',
    host: 'http://' + window.location.host,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa('maya:papapa')
    }
  })
  //DS.LSAdapter.create();
});
*/

/*
  ajaxSettings: function(url, method) {
    return {
      url: url,
      type: method,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa('maya:papapa')
      },
      dataType: 'json'
    };
  }
*/
// problem is how to retrieve and handle requests and data (ember-data)
// ember-model looks a solution but has problems too
// ember-data expects json like json-api
// http://emberjs.com/api/data/
// http://emberjs.com/api/classes/Ember.DefaultResolver.html

  // comments: DS.attr()
// maybe is better start in base with other similar projects
// ember
// https://github.com/rocambolesque/kanbanlite/tree/master/public/js
// https://github.com/rauhryan/huboard/blob/master/app/assets/javascripts/board/config/store.js

// trello clone (backbone/rails)
// https://github.com/somlor/kanban
// angular
// https://github.com/greggigon/my-personal-kanban
