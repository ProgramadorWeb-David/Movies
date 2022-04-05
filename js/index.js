

// https://api.themoviedb.org/3/movie/now_playing?api_key=79f88fdea3003ba0dedbc09d285ff1bc&language=es-ES&page=1

const URL_PATH = 'https://api.themoviedb.org';

const API_KEY = '79f88fdea3003ba0dedbc09d285ff1bc';


document.addEventListener('DOMContentLoaded', () => {
    renderNewMovies();
    renderPupularMovies();
    renderTopRatedMovies();
});


// pedir o recuperar los datos
const getNewMovies = () => {
    const url = `${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch( url )
        .then( response => response.json() )
        .then( result => result.results )
        .catch( error => console.log(error) )
}

// renderizarlos en el HTML
const renderNewMovies = async () => {
    const newMovies = await getNewMovies();

    let html = '';

    newMovies.forEach((movie, index) => {
        const {id, title, overview, backdrop_path} = movie;

        // imagen de la pelicula
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;

        // hacia donde nos tiene que llevar
        const urlMovie = `../movie.html?id=${id}`;


        html += `
            <div class="carousel-item ${index === 0 ? 'active' : null}" style="background-image: url('${urlImage}')">
                <div class="carousel-caption">
                    <h5>${title}</h5>
                    <p>${overview}</p>
                    <a href="${urlMovie}" class="btn btn-primary">Más Información</a>
                </div>
            </div>
        `;
    });

    html += `
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-news-movies" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel-news-movies" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
    </button>
    `;

    document.getElementsByClassName('list-new-movies')[0].innerHTML = html;
}



// pedir o recuperar los datos
const getPopularMovies = () => {

    const url = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1
    `;

    return fetch(url)
        .then( response => response.json() )
        .then( result => result.results )
        .catch( error => console.log(error) )
}

// renderizarlos en el HTML
const renderPupularMovies = async () => {
    const movies = await getPopularMovies();

    let html = '';

    movies.forEach( (movie, index) => {
        const { id, title, poster_path } = movie;
        
        // imagen de la pelicula
        const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;

        // hacia donde nos tiene que llevar
        const urlMovie = `../movie.html?id=${id}`;

        if ( index < 5 ) {
            html += `
                <li class="list-group-item">
                    <img src="${movieCover}" alt="${title}">
                    <h3>${title}</h3>
                    <a href="${urlMovie}" class="btn btn-primary">Ver Más</a>
                </li>
            `;
        }

        document.getElementsByClassName('now-playing__list')[0].innerHTML = html;
    })
}



// pedir o recuperar los datos
const getTopRatedMovies = () => {
    const url = `${URL_PATH}/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch(url)
        .then( response => response.json() )
        .then( result => result.results )
        .catch( error => console.log(error) )
}

// renderizarlos en el HTML
const renderTopRatedMovies = async () => {
    const movies = await getTopRatedMovies();

    let html = '';

    movies.forEach( (movie, index) => {
        const { id, title, poster_path } = movie;

        // imagen de la pelicula
        const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;

        // hacia donde nos tiene que llevar
        const urlMovie = `../movie.html?id=${id}`;

        if ( index < 5 ) {
            html += `
            <li class="list-group-item">
                <img src="${movieCover}" alt="${title}" />
                <h3>${title}</h3>
                <a href="${urlMovie}" class="btn btn-primary">Ver Más</a>
            </li>
            `;
        }
    });

    document.getElementsByClassName('top-rated-playing__list')[0].innerHTML = html;
}