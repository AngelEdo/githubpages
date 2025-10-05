const carta = document.getElementById('carta');
const cartaContainer = document.getElementById('carta-container');
const contenido = document.getElementById('contenido');

carta.addEventListener('click', () => {
  cartaContainer.style.opacity = '0';
  cartaContainer.style.transition = 'opacity 0.6s ease';

  const musica = document.getElementById('musica');
  musica.currentTime = 0;
  musica.play();

  musica.addEventListener('ended', () => {
    musica.currentTime = 0;
    musica.play();
  });

  setTimeout(() => {
    cartaContainer.style.display = 'none';
    contenido.classList.remove('oculto');
    document.body.classList.remove('no-scroll');
    activarAnimaciones();
  }, 600);
});

function activarAnimaciones() {
  const observerTextos = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
      } else {
        entrada.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });

  const observerImagenes = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
      } else {
        entrada.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.03 });

  const textos = document.querySelectorAll('.fade-up-texto');
  const imagenes = document.querySelectorAll('.fade-up-imagen');

  textos.forEach(el => observerTextos.observe(el));
  imagenes.forEach(el => observerImagenes.observe(el));
}
activarAnimaciones();


function iniciarCuentaRegresiva(fechaEvento) {
  const cuenta = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia < 0) {
      clearInterval(cuenta);
      document.querySelector('.contador').innerHTML = '¡Ya comenzo!';
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById('dias').innerText = dias.toString().padStart(2, '0');
    document.getElementById('horas').innerText = horas.toString().padStart(2, '0');
    document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
  }, 1000);
}

const fechaEvento = new Date('2025-11-08T20:00:00').getTime();
iniciarCuentaRegresiva(fechaEvento);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

document.getElementById('formulario-confirmacion').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const asistencia = document.getElementById('asistencia').value;
  const mensaje = `Hola, soy ${nombre}. ${asistencia} a la fiesta de XV años .`;

  document.getElementById('bloque-confirmacion').style.display = 'none';
  const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

  if (asistencia === "Sí, asistiré"){
    mensajeConfirmacion.textContent = `Gracias ${nombre} por confirmar tu asistencia, te esperamos en la fiesta`;
  } else if (asistencia === "No podré asistir"){
    mensajeConfirmacion.textContent = `Lo sentimos ${nombre} gracias por tu consideración.`;
  }

  mensajeConfirmacion.style.display = 'block';

  const url = `https://wa.me/524492670283?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});

if(document.querySelector('.listslider')){
  let link = document.querySelectorAll(".listslider li a");
  link.forEach(function(link) {
     link.addEventListener('click', function(e){
        e.preventDefault();
        let item = this.getAttribute('itlist');
        let arrItem = item.split("_");
        funcionEjecutar(arrItem[1]);
        return false;
     });
   });
}
function funcionEjecutar(side){
   let parentTarget = document.getElementById('slider');
   let elements = parentTarget.getElementsByTagName('li');
   let curElement, siguienteElement;
   for(var i=0; i<elements.length;i++){
       if(elements[i].style.opacity==1){
           curElement = i;
           break;
       }
   }
   if(side == 'anterior' || side == 'siguiente'){
       if(side=="anterior"){
           siguienteElement = (curElement == 0)?elements.length -1:curElement -1;
       }else{
           siguienteElement = (curElement == elements.length -1)?0:curElement +1;
       }
   }else{
       siguienteElement = side;
       side = (curElement > siguienteElement)?'anterior':'siguiente';
   }
   
   let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
   elementSel[curElement].classList.remove("item-select-slid");
   elementSel[siguienteElement].classList.add("item-select-slid");
   elements[curElement].style.opacity=0;
   elements[curElement].style.zIndex =0;
   elements[siguienteElement].style.opacity=1;
   elements[siguienteElement].style.zIndex =1;
}