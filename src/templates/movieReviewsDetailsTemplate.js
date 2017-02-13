'use strict';

let movieReviewsDetailsTemplate = movie => 
    `<div class = "col-sm-6 col-md-12">
		<p><b>Review(s)</b>: ${movie}</p>
	</div>`;

module.exports = movieReviewsDetailsTemplate;