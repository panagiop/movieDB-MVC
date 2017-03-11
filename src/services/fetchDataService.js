'use strict';

let cachedResults = {};

// A simple $.ajax() wrapper
let fetchDataService = (url, options) => {
    options = options || {};

    $(options.spinnerClass).show(); // spinner for ajax calls

    return $.ajax({
        url: url,
        data: { page: options.page, query: options.query } // page parameter needs to dynamically change
    }).done((response) => {
        $(options.spinnerClass).hide();

        return response;
    }).fail(() => {
        alert('An error occured fetching movies'); // maybe a better way for error handling ?!
    });
};

module.exports = fetchDataService;
