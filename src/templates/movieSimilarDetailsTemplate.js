'use strict';

let movieSimilarDetailsTemplate = movie =>
    `<div class = "col-sm-6 col-md-12">
		<p><b>Similar movies</b>: ${movie}</p>
	</div>`;

module.exports = movieSimilarDetailsTemplate;
