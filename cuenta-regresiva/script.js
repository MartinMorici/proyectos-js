const nocheBuena = "12-25-2022";
const diasE= document.getElementById("dias");
const horasE= document.getElementById("horas");
const minutosE= document.getElementById("minutos");
const segundosE= document.getElementById("segundos");

function cuentaRegresiva(){
    const nocheBuenaFecha = new Date(nocheBuena);
    const fechaActual = new Date();

    const totalSegundos = (nocheBuenaFecha - fechaActual) / 1000; // 1s = 1000ms

    const dias = Math.floor(totalSegundos / 3600 / 24); // totalSegundos/3600s = horas      horas/24hs = dias restantes
    const horas = Math.floor(totalSegundos / 3600) % 24; // totalSegundos/3600s = horas     horas % 24hs = horas sobrantes 
    const minutos = Math.floor(totalSegundos / 60) % 60; // totalSegundos/60s = minutos     minutos % 60s = minutos sobrantes
    const segundos= Math.floor(totalSegundos % 60); // totalSegundos % 60 = segundos sobrantes

    diasE.innerHTML = dias; 
    horasE.innerHTML = horas;
    minutosE.innerHTML = minutos;
    segundosE.innerHTML = segundos;

}

cuentaRegresiva()

setInterval(cuentaRegresiva, 1000);