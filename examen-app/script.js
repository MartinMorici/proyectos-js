const arrayPreguntas = [
    {
        pregunta: '¿Cuál de las siguientes personas diseñó JavaScript?',
        a:'Guido van Rossum',
        b:'James Gosling',
        c:'Brendan Eich',
        d:'Anders Hejlsberg',
        correcta: 'c'
    }, {
        pregunta:'¿Cuál es el lenguaje de programación más utilizado?',
        a:'Python',
        b:'JavaScript',
        c:'Java',
        d:'C++',
        correcta:'b'
    }, {
        pregunta:'¿Cuál es la base de datos más utilizada?',
        a:'PostgreSQL',
        b:'MongoDB',
        c:'SQLite',
        d:'MySQL',
        correcta: 'd'
    }, {
        pregunta: '¿Cuál es el Framework Web más utilizado?',
        a:'jQuery',
        b:'Angular',
        c:'React.js',
        d:'Express',
        correcta:'c'
    }
];

const preguntaE = document.getElementById('pregunta');
const resp_a = document.getElementById('resp_a');
const resp_b = document.getElementById('resp_b');
const resp_c = document.getElementById('resp_c');
const resp_d = document.getElementById('resp_d');
const boton = document.getElementById('boton');
const respuestas = document.querySelectorAll('.resp');
const examenContainer = document.getElementById('examenContainer');

let i=0;
let puntaje=0;

cargaExamen();

function cargaExamen() {
    limpiarRespuestas();
    preguntaE.innerHTML = arrayPreguntas[i].pregunta
    resp_a.innerHTML = arrayPreguntas[i].a
    resp_b.innerHTML = arrayPreguntas[i].b
    resp_c.innerHTML = arrayPreguntas[i].c
    resp_d.innerHTML = arrayPreguntas[i].d
}

function limpiarRespuestas() {
    respuestas.forEach(e => {
        e.checked = false;
    });
}


function getRespuesta() {
    let respuesta = false;

    respuestas.forEach(e => {      // Verifico si hay una respuesta seleccionada. Devuelve valor de respuesta o "false"
        if (e.checked) {
            respuesta = e.id;
        }
    });
    return respuesta;
}


boton.addEventListener("click", () => {
    const respuesta = getRespuesta();
    if (respuesta) { // Si hay una respuesta seleccionada (valor distinto de falso) entra al if.

        if (respuesta === arrayPreguntas[i].correcta) {
             puntaje++;
        }

        i++;
        
        if (i < arrayPreguntas.length){       
            cargaExamen(); 
        } else {
            examenContainer.innerHTML = `<h1 class="puntaje"> Tu puntaje es ${puntaje}/${arrayPreguntas.length} </h1>`;
            boton.innerHTML = "Recargar";
            boton.setAttribute("onclick","location.reload()");
        }        
    }
    
})
