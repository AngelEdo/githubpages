const carta = document.getElementById('carta');
const cartaContainer = document.getElementById('carta-container');
const contenido = document.getElementById('contenido');

carta.addEventListener('click', () => {
  cartaContainer.style.opacity = '0';
  cartaContainer.style.transition = 'opacity 0.6s ease';

  setTimeout(() => {
    cartaContainer.style.display = 'none';
    contenido.classList.remove('oculto');
    activarAnimaciones();
  }, 600);
});

function activarAnimaciones() {
  const elementos = document.querySelectorAll('.fade-up');
  const opciones = { threshold: 0.1 };

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
      } else {
        entrada.target.classList.remove('visible');
      }
    });
  }, opciones);

  elementos.forEach(el => observer.observe(el));
}

function iniciarCuentaRegresiva(fechaEvento) {
  const cuenta = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia < 0) {
      clearInterval(cuenta);
      document.querySelector('.contador').innerHTML = '¡Ya comenzó!';
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

const fechaEvento = new Date('2025-07-31T00:00:00').getTime();
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
  mensajeConfirmacion.textContent = `¡Gracias, ${nombre} Por "${asistencia}"`;
  mensajeConfirmacion.style.display = 'block';

  const url = `https://wa.me/5211234567890?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});
