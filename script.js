// fetch('img/imag.png').then(response => console.log(response));
// fetch('https://jsonplaceholder.typicode.com/posts/')
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.log(error));
// fetch('https://my-json-server.typicode.com/kazetus/vs-code/posts/1')
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));

// Récupération des données d'une API et transformation en objet Javascript
// fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Nice?unitGroup=metric&key=8MA8ABG7RUKR6DFQU8D8S6VZ6&contentType=json')
// .then(reponse => reponse.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));

// Récupération d'une image via une API.
// fetch('https://picsum.photos/200/300.jpg')
// .then(reponse => reponse.blob())
// .then(data => affiche(data))
// .catch(error => console.error(error));

// function affiche(data) {
//     let img = document.createElement('img');
//     const url = URL.createObjectURL(data);
//     img.src = url;
//     document.body.appendChild(img);
// }

//Envoie en requête POST.
// let headers = new Headers();
// const Init = {
//     method : "POST",
//     headers : headers,
//     body: 'Bonjour le monde',
//     mode : 'cors',
//     cache: 'default'
// };
// let url = 'https://jsonplaceholder.typicode.com/posts/';
// function envoie(url, init) {
//     return fetch(url, init)
//     .then(response => response.json())
//     .then(data => console.log(data));
// }
// let recu = envoie(url, Init);
// console.log(recu);




// Themoviedb
const Imgsrc = "https://image.tmdb.org/t/p/w500";
let input = document.createElement('input');
let form = document.createElement('form');
let label = document.createElement('label');
let button = document.createElement('button');
let div = document.createElement('div');
let month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
div.className = "container";
button.type = 'submit';
button.innerHTML = 'Rechercher un film';
label.for = "movie";
label.innerHTML = "Saisissez le nom du film rechercher:";
input.type = 'text';
input.id = 'movie';
input.className = 'movie';
form.appendChild(label);
form.appendChild(input);
form.appendChild(button);
document.body.appendChild(form);
document.body.appendChild(div);
function clearBody() {
    div.innerHTML = "";
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=755658d8b059518e700051c06b4a978a&language=fr-FR&page=1&query=${input.value}`)
    .then(function(response){
        if(response.ok) {
            response.json().then(data => afficher(data));
        }
        else {
            errorFetch(response);
        }
    } )
    .catch(error => {
        errorFetch(error);
    });
});
function errorFetch(error) {
    clearBody();
    console.log(error);
    let errorMessage = document.createElement('div');
    errorMessage.className = 'film error'
        errorMessage.innerHTML = "Impossible de trouver le film demandé.";
        div.append(errorMessage);
}
function afficher(data){
    clearBody();
    console.log(data);
    data.results.map(el => afficherFilm(el));
}
function afficherFilm(el) {
    // if(el.poster_path != null) {
        let filmDiv = document.createElement('div');
        filmDiv.className = "film";
        let img = document.createElement('img');
        el.poster_path != null ? img.src = Imgsrc + el.poster_path : img.src = 'img/imag.png';
        filmDiv.appendChild(img);
        let title = document.createElement('h2');
        title.innerHTML = `${el.title}(${el.original_language})`;
        filmDiv.appendChild(title);
        let note = document.createElement('i');
        note.className = "fa-solid";
        el.vote_average >= 5 ? note.classList.add('fa-thumbs-up') : note.classList.add('fa-thumbs-down');
        note.innerHTML = `<p>La note des utilisateurs est de : ${el.vote_average} / 10</p>`
        filmDiv.appendChild(note);
        let date = document.createElement('p');
        date.className = "date";
        let dateSortie = new Date(el.release_date);
        date.innerHTML = `${dateSortie.getDate()} ${month[dateSortie.getMonth()]} ${dateSortie.getFullYear()}`;
        filmDiv.appendChild(date);
        let text = document.createElement('p');
        text.innerHTML = el.overview;
        filmDiv.appendChild(text);
        div.appendChild(filmDiv);
    // }
}
// const ApiKey = '3aa6970a57e694fc61a86fcf810ba744' 
// let movie = "code"
// let movies = []

// const fetchMovie = async ()=>{
//   const ApiUri = `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${movie}`
//   movies = await fetch(ApiUri).then((response) => response.json())
//   console.log(movies.results)
// }
// fetchMovie();