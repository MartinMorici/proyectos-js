const barra = document.getElementById('barra');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const circulos = document.querySelectorAll('.circulo');
const click = document.querySelectorAll('.click');

let pasoActual = 1;
document.body.style.backgroundImage = `url('./img/1.png')`;

next.addEventListener('click', () => {
   pasoActual++;
   if (pasoActual > circulos.length) {
      pasoActual = circulos.length;
   }
   actualizar();
});

prev.addEventListener('click', () => {
   pasoActual--;
   if (pasoActual < 1) {
      pasoActual = 1;
   }
   actualizar();
});

click.forEach((boton) => {
   boton.addEventListener('click', function (e) {
      const x = e.clientX;
      const y = e.clientY;
      const botonTop = e.target.offsetTop;
      const botonLeft = e.target.offsetLeft;
      const xInside = x - botonLeft;
      const yInside = y - botonTop;
      const circle = document.createElement('span');
      circle.classList.add('click');
      circle.classList.add('circle');
      circle.style.top = yInside + 'px';
      circle.style.left = xInside + 'px';

      this.appendChild(circle);

      setTimeout(() => circle.remove(), 500);
   });
});

function actualizar() {
   circulos.forEach((c, idx) => {
      if (idx < pasoActual) {
         c.classList.add('active');
      } else {
         c.classList.remove('active');
      }
   });

   const activos = document.querySelectorAll('.active');

   document.body.style.backgroundImage = `url('./img/${activos.length}.png')`;

   //    document.body.style.backgroundImage = `url('./img/${activos.length}.png')`;

   switch (activos.length) {
      case 1:
         barra.style.width = 0 + '%';
         break;

      case 2:
         barra.style.width = 33 + '%';
         break;

      case 3:
         barra.style.width = 66 + '%';

         break;

      case 4:
         barra.style.width = 100 + '%';
         break;
   }

   if (pasoActual == 4) {
      next.disabled = true;
   } else if (pasoActual == 1) {
      prev.disabled = true;
   } else {
      prev.disabled = false;
      next.disabled = false;
   }
}
