// https://api.themoviedb.org/3/movie/now_playing?api_key=79f88fdea3003ba0dedbc09d285ff1bc&language=es-ES&page=1

const URL_PATH = 'https://api.themoviedb.org';

const API_KEY = '79f88fdea3003ba0dedbc09d285ff1bc';

let MOVIE_ID = "";

document.addEventListener('DOMContentLoaded', () => {
    MOVIE_ID = getUrlVars().id;
    renderMovieDetails(MOVIE_ID);
});


const getUrlVars = () => {
    let vars = {};

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    })

    return vars;
}

const getMovieDetails = (movieId) => {
    const url = `${URL_PATH}/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log(error))
}

const renderMovieDetails = async (movieId) => {
    const movieDetails = await getMovieDetails(movieId);
    
    const { backdrop_path, poster_path, title, genres, overview, release_date } = movieDetails;

    renderBackground(backdrop_path);
    renderPoster(poster_path, title);
    renderMovieData(title, overview, genres, release_date);
    getTeaser(movieId);
}

const renderBackground = (backdrop_path) => {
    const urlBackground = `https://image.tmdb.org/t/p/original${backdrop_path}`;

    document.getElementsByClassName('movie-info')[0].style.backgroundImage = `url('${urlBackground}')`;
}

const renderPoster = (poster_path, title) => {
    const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;

    const html = `<img src="${urlPoster}" class="img-fluid movie-info__poster-img" alt="${title}" />`;

    document.getElementsByClassName('movie-info__poster')[0].innerHTML = html;
}

const renderMovieData = (title, overview, genres, release_date) => {

    const dataSplit = release_date.split('-');
    
    let htmlGenres = "";
    genres.forEach(genero => {
        htmlGenres += `<li>${genero.name}</li>`;
    });
    
    const html = `
        <h1>
            ${title} 
            <span class="date-any">${dataSplit[0]}</span> 
            <span class="teaser" data-toggle="modal" data-target="#video-teaser">
            <i class="fas fa-play"></i> Ver Trailer
            </span> 
        </h1>

        <h5>General</h5>
        <p>${overview}</p>
        <h5>Generos</h5>
        <ul>
            ${htmlGenres}
        </ul>
    `;

    document.getElementsByClassName('movie-info__data')[0].innerHTML = html;
}

const getTeaser = (movieId) => {
    const url = `${URL_PATH}/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES
    `;

    fetch(url)
        .then(response => response.json())
        .then(result => {renderTeaser(result)})
        .catch(error => console.log(error));
}

const renderTeaser = (objVideo) => {
    let keyVideo = "";

    objVideo.results.forEach( video => {
        if(video.type === "Teaser" && video.site === "YouTube") {
            keyVideo = video.key;
        }
    });


    let urlIframe = "";

    if(keyVideo !== "") {
        urlIframe = `
            <iframe width="100" height="400" src="https://www.youtube.com/embed/${keyVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    } else {
        urlIframe = "<div class='no-teaser'>La película no tiene trailer</div>";
    }

    document.getElementsByClassName('video-teaser-iframe')[0].innerHTML = urlIframe;
}