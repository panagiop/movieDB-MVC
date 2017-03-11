(() => {
    'use strict';

    global.$ = global.jQuery = require('jquery');

    const movieListControllerObject = require('./controllers/movieListController');
    
    // call the Controller that is responsible for "now playing" list
    movieListControllerObject.init();
})();
