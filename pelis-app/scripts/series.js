const popular_pathTV =
   "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=23a03524c9a1d5f89d2ee8bbdbb8fa0e";
const contPeliculas = document.getElementById("contenedor-peliculas");
const input = document.getElementById("search");

input.addEventListener("keyup", (e) => {
   e.preventDefault();
   if (e.keyCode == 13 && input.value != "") {
      const busqueda = input.value.split(" ").join("+");
      getShows(busqueda);
   }
});

async function getShows(busqueda) {
   contPeliculas.classList.remove("cont-mensaje");
   const resp = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${busqueda}&api_key=23a03524c9a1d5f89d2ee8bbdbb8fa0e`
   );
   const respJSON = await resp.json();
   const resul = respJSON.results;
   printShows(resul);
   if (resul.length == 0) {
      contPeliculas.innerHTML = "";
      const mensaje = document.createElement("div");
      mensaje.classList.add("mensaje");
      mensaje.innerHTML = "No se encontró ninguna serie";
      contPeliculas.appendChild(mensaje);
      contPeliculas.classList.add("cont-mensaje");
   }
}

getPopularShows();
async function getPopularShows() {
   const resp = await fetch(popular_pathTV);
   const respJson = await resp.json();
   const populares = respJson.results;
   printShows(populares);
}

function printShows(series) {
   contPeliculas.innerHTML = "";
   series.forEach((p) => {
      let color = "";
      const serie = document.createElement("article");
      serie.classList.add("pelicula");
      if (p.vote_average < 6) {
         color = "red";
      } else {
         if (p.vote_average >= 5 && p.vote_average <= 7.5) {
            color = "orange";
         } else if (p.vote_average > 7.8) {
            color = "green";
         }
      }
      serie.innerHTML = `
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
            <p class="pelicula-title">${p.original_name}</p>
            <p class="pelicula-fecha">${p.first_air_date}</p>
         `;
      contPeliculas.appendChild(serie);
   });
}
