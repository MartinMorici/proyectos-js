const recetas_container = document.getElementById('receta_container');
const favoritos_container = document.getElementById('favoritos');
const buscador = document.getElementById('buscador');
const iconoBuscar = document.getElementById('iconoBuscar');
const btnCerrarPopup = document.getElementById('receta-cerrar');
const popupContainer = document.getElementById('popup-container');
const recetaInfo = document.getElementById('receta-info');

getRecetaRandom();
setFavoritos();
noFavoritos();

async function getRecetaRandom() {
    // Espero la respuesta con await
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    // Convierto la respuesta a json
    const respJson = await resp.json();
    // Me guardo la receta 
    const recetaRandom = respJson.meals[0];
    setReceta(recetaRandom,true);
}


async function getRecetasBusqueda(busqueda) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + busqueda);
    const respJson = await resp.json();
    const recetas = respJson.meals;

    return recetas;

}

async function getRecetasPorId(id){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respJson = await resp.json();
    const receta = respJson.meals[0];

    return receta;

}

function setReceta(receta, esRandom = false) {
    const recetaHTML = document.createElement('div');
    recetaHTML.classList.add('receta');
    recetaHTML.innerHTML =
                                `${esRandom ? `<span>Receta del día</span>` : '' }
                                    <img class="receta__imagen recetaClick"  src="${receta.strMealThumb}" alt="">
                                    <div class="receta__info">
                                        <h3 class="recetaClick">${receta.strMeal}</h3>
                                        <div class="cuadrado"><img class="corazon favBtn"src="corazon.svg" alt=""></div>
                                    </div>` 

                                
    recetas_container.appendChild(recetaHTML);

    const favBtn = recetaHTML.querySelector('.favBtn');
    
    favBtn.addEventListener("click", () => {
        if (favBtn.classList.contains('corazon-active')) {
            delRecetaLS(receta.idMeal);
            favBtn.classList.remove('corazon-active');
        } else{
            addRecetaLS(receta.idMeal);
            favBtn.classList.add('corazon-active');
        }

        setFavoritos();
        noFavoritos();
    });
    
    document.querySelectorAll('.recetaClick').forEach(item => {
            item.addEventListener('click', () => {
            mostrarReceta(receta);
            })
        });


}

function addRecetaLS(idReceta){
    // Traigo todas las recetas del Local Storage
    const recetasLS =  getRecetasLS();

    // Agrego al local storage las recetas existentes + la nueva receta (pasandolo a string)
    localStorage.setItem("recetas", JSON.stringify([...recetasLS,idReceta]));
}

function delRecetaLS(idReceta) {
    // Traigo todas las recetas del Local Storage
    const recetasLS = getRecetasLS();

    // Agrego a Local Storage todas las recetas menos la seleccionada
    localStorage.setItem("recetas", 
                        JSON.stringify(recetasLS.filter( (receta) => receta != idReceta) ) )
}

function getRecetasLS() {
    const recetasLS = JSON.parse(localStorage.getItem("recetas"));
    return recetasLS === null ? [] : recetasLS;
}

// La funcion getRecetasPorId es una función asincrona, por lo tanto devuelve una promesa. Por eso esta funcion debe ser asincrona también
async function setFavoritos(){

    const recetasLS = getRecetasLS();
    favoritos_container.innerHTML = '';

    // No usar await en for each
    for (let i = 0; i < recetasLS.length; i++) {
        const receta = await getRecetasPorId(recetasLS[i]);
        imprimirFavoritos(receta);
    }

}





function imprimirFavoritos(receta){
    const recetaFavorita = document.createElement('div')
    recetaFavorita.classList.add('item');

    recetaFavorita.innerHTML = 
                                `<img class="item-img abrirFav" src="${receta.strMealThumb}" alt="">
                                <span class="abrirFav">${receta.strMeal}</span>
                                <img class="item-eliminar" src="./cerrar.svg" alt="">`


    const btnEliminar = recetaFavorita.querySelector('.item-eliminar');
    btnEliminar.addEventListener("click", () => {
        delRecetaLS(receta.idMeal);
        setFavoritos();
        noFavoritos();
    });
    favoritos_container.appendChild(recetaFavorita);

    // Abrir modal con nombre e imagen de la receta favorita excluyendo al icono de cerrar
    document.querySelectorAll('.abrirFav').forEach(item => {
        item.addEventListener('click', () => {
        mostrarReceta(receta);
        })
    });


}



iconoBuscar.addEventListener("click", async () =>{
    recetas_container.innerHTML = '';
    const recetas = await getRecetasBusqueda(buscador.value);
    recetas.forEach(receta => {
        setReceta(receta);
    });

})
btnCerrarPopup.addEventListener("click", () => {
    popupContainer.classList.add('hidden');
})

function mostrarReceta(receta) {
    let output = '';
    for (let i = 1; i <= 20; i++) {
        if(receta['strIngredient' + i]){
            output = output + '<li>' + receta['strIngredient'+i] + " - " + receta['strMeasure'+i] + '</li>'
        }else break;
    }
    recetaInfo.innerHTML =`
                        <h1>${receta.strMeal}</h1>
                        <img src="${receta.strMealThumb}" alt="">
                        <p class="receta-instrucciones">${receta.strInstructions}</p>
                        <h3>Ingredientes</h3>
                        <ul>
                            ${output}
                        </ul>
                        `
        
    popupContainer.classList.remove('hidden');
}

function noFavoritos() {
    if (getRecetasLS().length == 0 ) {
        favoritos_container.innerHTML = `<p class="no-favorito"> No tienes ninguna receta en favoritos <p>`      
    }
}