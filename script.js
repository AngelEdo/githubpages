const carta = document.getElementById('carta');
const cartaContainer = document.getElementById('carta-container');
const contenido = document.getElementById('contenido');

// Al hacer clic en la carta
carta.addEventListener('click', () => {
  cartaContainer.style.opacity = '0';
  cartaContainer.style.transition = 'opacity 0.6s ease';

  setTimeout(() => {
    cartaContainer.style.display = 'none';
    contenido.classList.remove('oculto');
    activarAnimaciones();
  }, 600);
});

// Mostrar animaciones al hacer scroll
function activarAnimaciones() {
  const elementos = document.querySelectorAll('.fade-up');
  const opciones = { threshold: 0.1 };

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
      } else {
        entrada.target.classList.remove('visible'); // <- permite reiniciar la animación
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

// Fecha del evento
const fechaEvento = new Date('2025-07-31T00:00:00').getTime();
iniciarCuentaRegresiva(fechaEvento);

// 👇 Esto evita que el navegador mantenga el scroll antiguo
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// 👇 Esto fuerza que se inicie en la parte superior
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
