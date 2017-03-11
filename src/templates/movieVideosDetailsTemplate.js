'use strict';

let movieVideosDetailsTemplate = movie =>
    `<div class = "col-sm-6 col-md-12">
    	<iframe class="youtube-videos-container embed-responsive-item" src="https://www.youtube.com/embed/${movie.key}"></iframe>
	</div>`;

module.exports = movieVideosDetailsTemplate;
