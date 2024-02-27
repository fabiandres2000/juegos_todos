let intentosIncorrectos = 0;
let cantidad = 0;
let cuerpoSel;
let parteMostrada = [];

let seres = [
  {
    imagen: "img/perro.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/gato.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/leon.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/elefante.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/abeja.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/araña.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/pez.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/delfin.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/flor.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/arbol.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/hongo.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/oso.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/pajaro.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/tigre.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/cangrejo.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/jirafa.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/tortuga.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/lobo.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/medusa.png",
    clasificacion: "vivo",
  },
  {
    imagen: "img/colibri.png",
    clasificacion: "vivo",
  },

  // Seres inertes
  {
    imagen: "img/mesa.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/silla.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/roca.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/reloj.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/computadora.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/libro.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/celular.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/boligrafo.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/lampara.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/carro.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/bicicleta.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/television.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/llave.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/gafas.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/escalera.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/martillo.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/taza.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/bomba.png",
    clasificacion: "inerte",
  },
  {
    imagen: "img/candado.png",
    clasificacion: "inerte",
  },
];

var estados = ["inerte", "vivo"];

 
let countdownInterval;
const gameDuration = 60;
let timer = gameDuration;
let score = 0;
let countdownDivs;
let estadoSel;

function inicioJuego() {

  let indice = Math.floor(Math.random() * estados.length);
  estadoSel = estados[indice];
  document.getElementById("tiCate").innerHTML = "¿Cuales seres son "+estadoSel+"?";
  countdownInterval = setInterval(() => {
    if (timer > 0) {
        timer--;
        updateTimer();
    } else { 
        clearInterval(countdownInterval);
        clearInterval(countdownDivs);
        $("#principal").fadeToggle(1000);
        $("#final").fadeToggle(1000);
        if (score <= 0) {
            isPaused = false;
            var audio = new Audio("../../sounds/game_over.mp3");
            audio.play();
            document.getElementById("final").style.backgroundImage =
                "url(../../images/derrota.gif)";
            document.getElementById("texto_final").innerText =
                "No has logrado obtener ningún punto";
        } else {
            document.getElementById("final").style.backgroundImage =
                "url(../../images/victoria.gif)";
            var audio = new Audio("../../sounds/victory.mp3");
            audio.play();
            document.getElementById("texto_final").innerText =
                "Has obtenido " + score + " puntos";
        }
    }
}, 1000);

  crearDiv();
  countdownDivs = setInterval(crearDiv, 4000);
}




function crearDiv() {
let indice = obtenerIndiceAleatorio();
  const nuevoDiv = document.createElement("div");
  nuevoDiv.className = "movible";
  nuevoDiv.style.left = "0";
 
  nuevoDiv.innerHTML = `<img width="200" src="${seres[indice].imagen}">`;
  nuevoDiv.setAttribute("data-id",seres[indice].clasificacion);
  document.body.appendChild(nuevoDiv);

  nuevoDiv.addEventListener('click', function() {
    var estado = nuevoDiv.getAttribute('data-id');
    var imagen = document.createElement("img");
    imagen.style.width = "150px";
    imagen.style.position = "absolute";
    imagen.style.top = "50%";
    imagen.style.left = "50%";
  
    if(estado == estadoSel){
      imagen.src = "img/correcta.png";
      score++;
    }else{
      imagen.src = "img/incorrecta.png";
    }

    nuevoDiv.appendChild(imagen);
   
  });
  

  function moverDiv() {
    const posicionActual = parseInt(getComputedStyle(nuevoDiv).left);
    const anchoPantalla = window.innerWidth;

    if (posicionActual < anchoPantalla) {
      nuevoDiv.style.left = (posicionActual + 1) + "px";
    } else {
     
      nuevoDiv.remove();
    }
  }

  setInterval(moverDiv, 1);
}



function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * seres.length);
  return indice;
}

function updateTimer() {
  document.getElementById(
      "timer_sec"
  ).innerText = `Tiempo restante: ${timer} s`;
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
