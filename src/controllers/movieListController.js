'use strict';

const config = require('../../config'),
    fetchDataService = require('../services/fetchDataService'),
    movieListTemplate = require('../templates/movieListTemplate'),
    movieDetailsController = require('./movieDetailsController'),
    appendItemsToTemplate = require('../helpers/appendItemsToTemplate');

let nowPlayingControllerObject = {
    page: 1, // current page in endpoint
    isSearchEndpointUsed: false,
    init () {
        this.cacheDom();
        this.bindEvents();
        this.chainResponses(this.fetchNowPlayings(), this.fetchGenres());
    },
    cacheDom () {
        this.$window = $(window);
        this.$document = $(document);
        this.$body = $('body');
        this.$input = $('input');
        this.$spinnerClass = $('.spinner');
        this.$list = $('.list-items');
        this.$detailsBtnClass = '.details-button';
        this.$headerContent = $('.header-content');
    },
    bindEvents () {
        this.$window.scroll(this.fetchNextPage.bind(this));
        this.$body.on('keyup', this.search.bind(this));
        this.$body.on('click', this.$detailsBtnClass, this.showDetails.bind(this));
        this.$input.on('keyup', this.changeHeaderContent.bind(this));
    },
    render (...args) {
        return appendItemsToTemplate(...args);
    },
    fetchNowPlayings () {
        return fetchDataService(config.xhrOptions.nowPlayingUrl, { 
            page: this.page, spinnerClass: this.$spinnerClass 
        }); 
    },
    fetchGenres () {
        return fetchDataService( config.xhrOptions.genresUrl, {
            spinnerClass: this.$spinnerClass 
        });
    },
    fetchSearchResults () {
        return fetchDataService( config.xhrOptions.searchUrl, {
            page: this.page, spinnerClass: this.$spinnerClass, query: this.$input.val() 
        });
    },
    chainResponses (...promises) {
        $.when(
            promises[0],
            promises[1]
        ).done((response1, response2) => {
            response1[0].results.forEach((item) => {
                // "genres_name" attribute holds the genres' name instead of ids
                item.genres_name = item.genre_ids.map(id => {
                    let matchingItems = response2[0].genres.find(elem => elem.id === id);
                    if ( matchingItems ) {
                        return matchingItems.name;
                    }
                });
            });

            this.render(response1[0], this.$list, movieListTemplate);

        }).fail(() => {
            alert('An error occured completing the requests');
        });
    },
    search (event) {
        // allow only characters, numbers, backspace and spacebar
        let input = String.fromCharCode(event.keyCode);
        if ( !/[a-zA-Z0-9-_\b ]/.test(input) || event.keyCode === '13') { return; }

        this.isSearchEndpointUsed = true;

        if ( !this.$input.val().length ) {
            this.$body.scrollTop(0);
            this.$list.empty();
            this.page = 1;
            this.isSearchEndpointUsed = false;
            return this.chainResponses(this.fetchNowPlayings(), this.fetchGenres());
        }

        if ( this.$input.val().length > 2 ) {
            this.$body.scrollTop(0);
            this.$list.empty();
            this.page = 1;
            return this.chainResponses(this.fetchSearchResults(), this.fetchGenres());
        }
    },
    fetchNextPage () {
        if ( this.$window.scrollTop() + this.$window.height() === this.$document.height() 
            && this.$window.scrollTop() !== 0 ) {
            
            this.page++;

            if ( !this.isSearchEndpointUsed ) {
                this.chainResponses(this.fetchNowPlayings(), this.fetchGenres());
            } else {
                this.chainResponses(this.fetchSearchResults(), this.fetchGenres());
            }
        }
    },
    showDetails (event) {
        let targetElement = $(event.target).closest('.list-container');
        let elementId = targetElement.attr('id');
        let elementClass = targetElement.find('.details-container');
        let detailsBtn = targetElement.find('.details-button');

        // avoid api calls in case movie details section has previously visited
        if ( elementClass.css('display') === 'none' && !elementClass.hasClass('isVisited') ) {
            elementClass.toggle();
            elementClass.addClass('isVisited');
            movieDetailsController(elementId, elementClass);
            detailsBtn.text('Hide details');
        } else {
            elementClass.toggle();
            detailsBtn.text('View details');
        }
    },
    changeHeaderContent () {
        if ( this.$input.val().length && this.$input.val().length > 2) {
            return this.$headerContent.text(`Showing results for: ${this.$input.val()}`);
        } 

        if ( !this.$input.val().length ) {
            return this.$headerContent.text('In Theaters');
        }
    }
};

module.exports = nowPlayingControllerObject;