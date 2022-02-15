const popular_path =
   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=23a03524c9a1d5f89d2ee8bbdbb8fa0e";

const contPeliculas = document.getElementById("contenedor-peliculas");
const input = document.getElementById("search");

getPopularMovies();

async function getPopularMovies() {
   const resp = await fetch(popular_path);
   const respJson = await resp.json();
   const populares = respJson.results;
   printMovies(populares);
}

function printMovies(peliculas) {
   contPeliculas.innerHTML = "";
   peliculas.forEach((p) => {
      let color = "";
      const pelicula = document.createElement("article");
      pelicula.classList.add("pelicula");
      if (p.vote_average < 6) {
         color = "red";
      } else {
         if (p.vote_average >= 5 && p.vote_average <= 7.5) {
            color = "orange";
         } else if (p.vote_average > 7.8) {
            color = "green";
         }
      }
      pelicula.innerHTML = `
            <div class="wrapper-img">
               <img
                  class="pelicula-img"
                  src="https://image.tmdb.org/t/p/w500${p.poster_path}"
                  alt=""
               />
               <div class="pelicula-rate ${color}">${p.vote_average}</div>
               <div class="pelicula-resumen">
                  <h2>Resumen:</h2>
                  ${p.overview}
               </div>
            </div>
            <p class="pelicula-title">${p.title}</p>
            <p class="pelicula-fecha">${p.release_date}</p>
         `;
      contPeliculas.appendChild(pelicula);
   });
}

input.addEventListener("keyup", (e) => {
   e.preventDefault();
   if (e.keyCode == 13 && input.value != "") {
      const busqueda = input.value.split(" ").join("+");
      getMovies(busqueda);
   }
});

async function getMovies(busqueda) {
   contPeliculas.classList.remove("cont-mensaje");
   const resp = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${busqueda}&api_key=23a03524c9a1d5f89d2ee8bbdbb8fa0e`
   );
   const respJSON = await resp.json();
   const resul = respJSON.results;
   printMovies(resul);
   if (resul.length == 0) {
      contPeliculas.innerHTML = "";
      const mensaje = document.createElement("div");
      mensaje.classList.add("mensaje");
      mensaje.innerHTML = "No se encontró ninguna pelicula";
      contPeliculas.appendChild(mensaje);
      contPeliculas.classList.add("cont-mensaje");
   }
}
