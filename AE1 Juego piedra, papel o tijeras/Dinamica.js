var mostrado = false;
var finPartido = false;
const tablero = rellenarTablero();
var opcionJugador;
var opcionOrdenador;
var total;
var puntosJugador = 0;
var puntosOrdenador = 0;
var partidos=0;
var continuar = false;
var totalJugador = 0;
var totalOrdenador = 0;

let ultimoInput = null; // damos al input valor null para que no coincida con el input que 
// pedimos en nuestro codigo html, 
function validar() {
  const input = document.getElementById('text').value;
  if (typeof input !== 'string') {
    alert("The input is not a string. Please enter a string.");
  } else {
    if(!mostrado || input !== lastInput){ // si no hemos mostrado las imagenes o 
      //si el input no es igual al ultimo ingresado
      const tablero = rellenarTablero(); // creamos nuestra variable y rellenamos el tablero
      
      reset(); // hacemos un reset de nuestras variables 
      playSound();
      mostrarJugador(tablero.imagenes); // lanzamos la funcion mostrar jugador para que 
      //se visualicen las imagenes de id jugador 
      mostrarOrdenador(tablero.imagenes); // hacemos lo mismo en esta función 
      mostrado=true; // ponemos nuestro booleano en true porque se ha mostrado 
      lastInput = input; 
      // hacemos que nuestro input sea igual al ultimo que hemos guardado. 
    }
  }
}

function reset() {
  // Array de id 
  const ids = ['jugador', 'ordenador', 'resultado', 'seleccionJugador', 'seleccionOrdenador', 'puntosJugador', 'puntosOrdenador'];

  // hacemos un for each para que se muestren todos 
  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = ''; // limpiamos todo lo que teniamos guardado 
    }
  });

  // Reseteamos las variables por el nuevo usuario o por si volvemos a empezar un partido 
  puntosJugador = 0;
  puntosOrdenador = 0;
  partidos = 0;
  mostrado = true;
}


function rellenarTablero(){

  const imagenes = [
    'image/piedra.png',
    'image/papel.png',
    'image/tijera.png',
    'image/lagarto.png',
    'image/spock.png',
    'image/player.png',
    'image/pc.png',
    'image/empate.png',



  ];
  const sonidos = [
    'sound/piedra.mp3',
    'sound/papel.wav',
    'sound/tijera.mp3',
    'sound/lagarto.mp3',
    'sound/spock.mp3',
    'sound/win.mp3',
    'sound/loose.mp3',
    'sound/empate.mp3',
    'sound/inicio.mp3'



  ];

  return {
    imagenes: imagenes,
    sonidos: sonidos
  };
}

function playSound(){
  var audio = new Audio();
  audio.src = tablero.sonidos[8]; // audio inicial 
  audio.play();
}

// en esta funcion entramos en nuestro array y nos recogemos las imagenes 5, 
// despues hacemos un setattribute para que podamos tomar el index de las imagenes 
// todo esto lo aplicamos en nuestro id de jugador, creamos el img.
// añadimos a este index la opcion i ( array de 5 elementos)
// con la propiedad mouseover hacemos un zoom y hacemos que la imagen sea mas grande de 1.5 
// cuando salgamos sera de 1 y volvera a su tamaño original 
function mostrarJugador(){
  var jugador = document.getElementById('jugador');
  jugador.className = 'columna';
  for (var i = 0; i < 5; i++) {
    var img = document.createElement('img');
    img.src = tablero.imagenes[i]; 
    img.setAttribute('tabindex', '0');
    // aqui hacemos que las imagenes puedan tener focus 
    img.setAttribute('opcion', i); 
    // hacemos que las imagenes por index i de nuestro for 
    // pueda ser guardado en la variable opción con la propiedad setAttribute
    
    img.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.5)';
    });
    
    img.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
    });
    
    img.addEventListener('click', function() {
      // cada vez que hagamos click en las imagenes 
      // nos creamos la variable opcion jugador desde tiradaJugador 
      opcionJugador = tiradaJugador(this.getAttribute('opcion'));
      // nos creamos la opcionOrdenador desde tiradaOrdenador 
      opcionOrdenador = tiradaOrdenador();
      determinarGanador(opcionJugador, opcionOrdenador);

    });
    
    jugador.appendChild(img);
  }
}

// en esta función mostramos el ordenador 


function mostrarOrdenador(imagenes){
  // enlazamos la constante div con ordenador 
  const div = document.getElementById('ordenador');
  // creamos un for de 5 elementos 
  for(var i =0; i <5; i++){
      // creamos una constante img y su objeto img
      const img = document.createElement('img');
      // nos recogemos el array en con img.src
      img.src = imagenes[i];
      // añadimos este array para que sea visible 
      div.appendChild(img);
    }
}

function tiradaJugador(opcion) {
  // si los partidos son 5 el programa pide si se quiere jugar otra vez  
  if (partidos >=5) {
    jugarOtroPartido();
    return;
  }
  //vamos sumando los partidos cada vez que tiremos 
  // creamos la variable jugador y la añadimos al id seleccionJugador 
  var jugador = document.getElementById('seleccionJugador');
  // hacemos un clear de las previas imagenes para que tengamos siempre la ultima imagen seleccionada
  jugador.innerHTML = '';
  // hacemos un array de las opciones 
  var opciones = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];
  // nos traemos el array y el index de la opcion elegida desde nuestra función mostrarJugador 
  // reproducimos el audio del array sonidos y el index que hemos elegido en la funcion para que se 
  // reproduzca el sonido dependiendo de si es piedra papel o tijera 
  let audio = new Audio(tablero.sonidos[parseInt(opcion)]);
  audio.play();
  // creamos el elemento img y nos recogemos a traves de src el index de la imagen seleccionada 
  //desde la opcion que hemos definido en nuestra función mostrar jugador esta sera transformada en int 
  // y sera tomada como index en  el array del tablero de imagenes guardadas
  var img = document.createElement('img');
  img.src = tablero.imagenes[parseInt(opcion)];
  // añadimos las imagenes a nuestro id jugador 
  jugador.appendChild(img);
  // devolvemos la eleccion que hizo el usuario ya le hemos dado el valor de opción jugador 
  return opciones[parseInt(opcion)];
}

function tiradaOrdenador() {
  if (partidos >=5) {
    if(!continuar){
      reset();
      return;
    }
  }
  var opcion = Math.floor(Math.random() * 5);
  var opciones = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];
  var ordenador = document.getElementById('seleccionOrdenador');
  ordenador.innerHTML = '';
  var img = document.createElement('img');
  img.src = tablero.imagenes[opcion];
  ordenador.appendChild(img);
  return opciones[opcion];
}

function jugarOtroPartido() {
  // Pedimos al usuario si quiere jugar otro partido 
  var playAgain = confirm("Quieres jugar Otro Partido?");
  if (playAgain) {
    continuar = true;
    partidos = 0; // Reset the partidos count
    var jugador = document.getElementById('text').value;

    if(continuar){
      if (puntosJugador > puntosOrdenador) {
        totalJugador++;
        alert(jugador + ', ha ganado ' + totalJugador + ' veces contra el ordenador!');
      }
      else if(puntosOrdenador > puntosJugador){
        totalOrdenador++;
        alert('El ordenador , ha ganado ' + totalOrdenador+ ' veces contra '+jugador);
      }
      else if(puntosJugador == puntosOrdenador){
        alert(jugador + ', ha empatado contra el ordenador!');
      }
    }
  }
  else{
    alert('El jugador ha ganado ' + totalJugador + ' veces. El ordenador ha ganado ' + totalOrdenador + ' veces.'); // Display the total games won
    reset(); //invocamos esta funcion que resetea todos los otros valores
    mostrado = false; // Reseteamos la variable definida para que no mostre otras imagenes 
    totalJugador = 0; // Reseteamos el total de juegos ganados por el jugador
    totalOrdenador = 0; // Reseteamos el total de juegos ganados por el ordenador
  }

}

// en esta función determinaremos nuestro ganador 
function determinarGanador(opcionJugador, opcionOrdenador) {
  partidos++;
  var resultado;
  var img = document.createElement('img');
  var audio = new Audio();

  // tomamos el id resultado desde nuestro codigo en html 
  var resultadoDiv = document.getElementById('resultado');

  // limpiamos la seleccion previa del ganador para que a cada tirada se 
  // actualice con la ultima 
  resultadoDiv.innerHTML = '';

  // si la opcion jugador es igual a la del ordenador 
  if (opcionJugador === opcionOrdenador) {
    resultado = "Empate";
    // creamos un objeto imagen y le asignamos la imagen que tenemos en el array en este 
    // caso fija porque queremos que salga siempre la misma 
    img.src = tablero.imagenes[7];
    audio.src = tablero.sonidos[7];
    audio.play();
  } else if (
    (opcionJugador === "piedra" && (opcionOrdenador === "tijera" || opcionOrdenador === "lagarto")) ||
    (opcionJugador === "papel" && (opcionOrdenador === "piedra" || opcionOrdenador === "spock")) ||
    (opcionJugador === "tijera" && (opcionOrdenador === "papel" || opcionOrdenador === "lagarto")) ||
    (opcionJugador === "lagarto" && (opcionOrdenador === "papel" || opcionOrdenador === "spock")) ||
    (opcionJugador === "spock" && (opcionOrdenador === "piedra" || opcionOrdenador === "tijera"))
  ) {
    resultado = "Ganaste";
    puntosJugador++; // incrementamos los puntos del jugador cuando este gana
    img.src = tablero.imagenes[5];
    audio.src = tablero.sonidos[5];
    audio.play();
  } else {
    resultado = "Perdiste";
    puntosOrdenador++; // incrementamos los puntos del ordenador cuando este gana 
    img.src = tablero.imagenes[6];
    audio.src = tablero.sonidos[6];
    audio.play();
  }

  // creamos un texto para que aparezca en nuestro html y lo enlazamos con el id resultado 
  var resultadoText = document.createTextNode(resultado);
  // lo mostramos 
  resultadoDiv.appendChild(resultadoText);

  // a la variable creada resultado div tambien asociamos las imagenes que nos hemos tomado del array 
  // y guardado en .src 
  resultadoDiv.appendChild(img);

  // nos recogemos el id puntosjugador 
  var puntosJugadorDiv = document.getElementById('puntosJugador');
  // nos recogemos el id puntosOrdenador 
  var puntosOrdenadorDiv = document.getElementById('puntosOrdenador');

  // escribimos por html los puntos que tiene el jugador y los que tiene el ordenador 
  puntosJugadorDiv.textContent = " Jugador: " + puntosJugador;
  puntosOrdenadorDiv.textContent = " Ordenador: " + puntosOrdenador;

  return {jugador: puntosJugador, ordenador: puntosOrdenador};
}




 


