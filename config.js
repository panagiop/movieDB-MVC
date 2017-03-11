const urlOptions = {
    urlPrefix: "https://api.themoviedb.org/3",
    urlPostfix: "language=en-US&api_key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // enter your api_key 
    urlImagesw185: "https://image.tmdb.org/t/p/w185"
};

// xhr options 
const xhrOptions = {
    async: true,
    crossDomain: true,
    nowPlayingUrl: `${urlOptions.urlPrefix}/movie/now_playing?${urlOptions.urlPostfix}`,
    genresUrl: `${urlOptions.urlPrefix}/genre/movie/list?${urlOptions.urlPostfix}`,
    searchUrl: `${urlOptions.urlPrefix}/search/movie?include_adult=false&${urlOptions.urlPostfix}`,
    method: "GET"
};

module.exports = {
  urlOptions: urlOptions,
  xhrOptions: xhrOptions
};
