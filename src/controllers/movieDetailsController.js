'use strict';

const config = require('../../config'), 
	  fetchDataService = require('../services/fetchDataService'),
      appendItemsToTemplate = require('../helpers/appendItemsToTemplate'),
      movieVideosDetailsTemplate = require('../templates/movieVideosDetailsTemplate'),
      movieReviewsDetailsTemplate = require('../templates/movieReviewsDetailsTemplate'),
      movieSimilarDetailsTemplate = require('../templates/movieSimilarDetailsTemplate');

let movieDetailsController = ( movieId, elementClass ) => {
    let movieDetailsControllerObject = {
        init () {
            this.cacheDom();
            this.chainResponses(this.fetchMovieVideos(), this.fetchMovieReviews(), this.fetchMovieSimilars());
        },
        cacheDom () {
            this.$spinnerClass = $('.spinner');
        },
        render (...args) {
            return appendItemsToTemplate(...args);
        },
        fetchMovieVideos () {
            return fetchDataService(`${config.urlOptions.urlPrefix}/movie/${movieId}/videos?${config.urlOptions.urlPostfix}`, 
                { spinnerClass: this.$spinnerClass });
        },
        fetchMovieReviews () {
            return fetchDataService(`${config.urlOptions.urlPrefix}/movie/${movieId}/reviews?${config.urlOptions.urlPostfix}`,
                { spinnerClass: this.$spinnerClass });
        },
        fetchMovieSimilars () {
            return fetchDataService(`${config.urlOptions.urlPrefix}/movie/${movieId}/similar?${config.urlOptions.urlPostfix}`,
                { spinnerClass: this.$spinnerClass });
        },
        chainResponses (...promises) {
            $.when(
                promises[0],
                promises[1],
                promises[2]
            ).done((response1, response2, response3) => {
                let reviewsMoviesToString = response2[0].results.map((item) => item.content).join('<br/><br/>'),
                    similarMoviesToString = response3[0].results.map((item) => item.title).join();

                // render the responses into corresponding templates 
                this.render(response1[0].results, elementClass, movieVideosDetailsTemplate);
                this.render(reviewsMoviesToString, elementClass, movieReviewsDetailsTemplate);
                this.render(similarMoviesToString, elementClass, movieSimilarDetailsTemplate);
            }).fail(() => {
                alert('An error occured completing the requests');
            });
        }
    };

    movieDetailsControllerObject.init();
};

module.exports = movieDetailsController;
