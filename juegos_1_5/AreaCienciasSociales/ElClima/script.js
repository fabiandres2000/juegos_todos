let intentosIncorrectos = 0;
let cantidad = 0;
let cuerpoSel;
let parteMostrada = [];

var image = document.getElementById("myImage");
var container = document.querySelector(".container");

var screenWidth = window.innerWidth;
var stopPosition = screenWidth - 500;

function inicioJuego() {
  var currentPosition = parseInt(window.getComputedStyle(image).left);
  if (currentPosition < stopPosition) {
    image.style.left = currentPosition + 10 + "px"; // Incremento de 10 píxeles para una mayor velocidad
    requestAnimationFrame(inicioJuego);
  } else {
    startZoom();
   // image.remove();
  }
}

function startZoom() {
  var body = document.body;
  var zoomableDiv = document.getElementById("mi-div");

  // Agregar clase de zoom
  zoomableDiv.classList.add("zoomed");

  // Esperar hasta que termine la transición de zoom
  zoomableDiv.addEventListener("transitionend", function() {
    // Cambiar color de fondo del body después del zoom
    body.style.backgroundColor = "#e0e0e0";

    // Reiniciar el zoom después de 1.5 segundos (1500 milisegundos)
    setTimeout(function() {
      body.style.backgroundColor = "";  // Reiniciar color de fondo del body
      zoomableDiv.classList.remove("zoomed");
      
      image.remove();
      
     setTimeout(function() { 
      document.body.style.backgroundImage = 'url("img/clima1.png")';}, 1400);
      zoomableDiv.remove();
   
    }, 1500);
    
  });
}

function obtenerIndiceAleatorio(cuerpo) {
  console.log(cuerpo);
  let indice = Math.floor(Math.random() * cuerpo.length);
  while (parteMostrada.includes(indice)) {
    indice = Math.floor(Math.random() * cuerpo.length);
  }
  parteMostrada.push(indice);

  return cuerpo[indice];
}

$(document).ready(function () {
  setTimeout(function () {
    let audio2 = new Audio("sounds/enunciado.mp3");
    audio2.playbackRate = 0.8;
    audio2.play();
  }, 4500);

  setTimeout(() => {
    $("#principal").fadeToggle(1000);
    $("#fondo_blanco").fadeToggle(3000);
    setTimeout(() => {
      const divAnimado = document.querySelector(".overlay");
      divAnimado.style.animationName = "moverDerecha";
      divAnimado.style.animationDirection = "normal";
      divAnimado.style.display = "block";
      setTimeout(() => {
        const divAnimado2 = document.querySelector(".nube");
        divAnimado2.style.animationName = "moverArriba";
        divAnimado2.style.animationDirection = "normal";
        divAnimado2.style.display = "block";
        setTimeout(() => {
          divAnimado.style.backgroundImage = "url(../../images/normal2.gif)";
          maquina2(
            "bienvenida",
            "Hola!, Soy genio, en este juego deberás identificar con que parte de tu cuerpo realizas las acciones mostradas. Tu puedes!!!",
            100,
            1
          );
        }, 3000);
      }, 2000);
    });
  }, 200);
});

function maquina2(contenedor, texto, intervalo, n) {
  var i = 0,
    // Creamos el timer
    timer = setInterval(function () {
      if (i < texto.length) {
        // Si NO hemos llegado al final del texto..
        // Vamos añadiendo letra por letra y la _ al final.
        $("#" + contenedor).html(texto.substr(0, i++) + "_");
      } else {
        // En caso contrario..
        // Salimos del Timer y quitamos la barra baja (_)
        clearInterval(timer);
        $("#" + contenedor).html(texto);
        if (!cerrardo) {
          document.querySelector("#btnomitir").style.display = "none";
          setTimeout(() => {
            cerrar_anuncio();
          }, 3000);
        }
        // Auto invocamos la rutina n veces (0 para infinito)
        if (--n != 0) {
          setTimeout(function () {
            maquina2(contenedor, texto, intervalo, n);
          }, 3600);
        }
      }
    }, intervalo);
}

let cerrardo = false;
function cerrar_anuncio() {
  let audio2 = new Audio("../../sounds/fondo.mp3");
  audio2.play();
  audio2.volume = 0.2;
  cerrardo = true;
  const divAnimado2 = document.querySelector(".nube");
  divAnimado2.style.animationName = "moverabajo";
  const divAnimado = document.querySelector(".overlay");
  divAnimado.style.backgroundImage = "url(../../images/normal1.gif)";
  $("#fondo_blanco").fadeToggle(3000);
  setTimeout(function () {
    divAnimado.style.animationName = "moverIzquierda";
    divAnimado.style.animationDirection = "normal";
    setTimeout(() => {
      $("#principal").fadeToggle(1000);
      inicioJuego();
    }, 2000);
  }, 2000);
}
