'use strict';

const config = require('../../config');

let nowPlayingListTemplate = movie =>
    `<div class="col-sm-6 col-md-6 list-container" id="${movie.id}"> 
		<div class="col-sm-6 col-md-6">
			<img class="" src="${config.urlOptions.urlImagesw185}/${movie.poster_path}" alt="${movie.original_title}">
		</div>
		<div class="col-sm-6 col-md-6 info-container">
			<h4 class="text-primary">${movie.title}</h4>
			<p><b>Year of release</b>: ${movie.release_date}</p>
			<p><b>Genre(s)</b>: ${movie.genres_name}</p>
			<p><b>Vote average</b>: ${movie.vote_average}</p>
		</div>
		<div class="col-sm-6 col-md-6 info-container">
			<p><b>Overview</b>: ${movie.overview}</p>
		</div>
        <div class="col-md-12 text-center">     
            <button class="btn btn-default details-button">View details</button>
        </div>
        <div class="details-container"></div> 
	</div>`;

module.exports = nowPlayingListTemplate;
