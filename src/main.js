(() => {
    'use strict';

    global.$ = global.jQuery = require('jquery');

    const nowPlayingControllerObject = require('./controllers/movieListController');
    
    // call the Controller that is responsible for "now playing" list
    nowPlayingControllerObject.init()
})();
