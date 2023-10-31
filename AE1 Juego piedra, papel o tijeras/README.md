# Desarrollo de Interfaces
## Actividad 1. Juego de Piedra, Papel, Tijeras, lagarto, Spock
Fecha de entrega: 31 de octubre
Porcentaje: 50%

* Crea un programa que permita al jugador ingresar su elección: "piedra",
"papel", "tijeras", “lagarto” o “Spock”.
* Genera aleatoriamente la elección del oponente (el ordenador) utilizando
un número aleatorio.
* Compara la elección del jugador con la elección del oponente y determina
el resultado del juego según las siguientes reglas:
    * Si ambas elecciones son iguales, es un empate.
    * Si no, las reglas son las siguientes:
![Esquema quien gana](images/esquema-quien-gana.jpg)
* Muestra el resultado del juego al jugador.
* Permite al jugador jugar nuevamente si lo desea.

## Elementos obligatorios:
1. El jugador deberá poder introducir su nombre en un formulario. El juego se
activará en ese momento. (1 punto):
![Introducir nombre](images/nombre.png)
2. El jugador elegirá una de las opciones. En el ejemplo, las imágenes se
hacen más grandes cuando el cursor para por encima y recuperan su
tamaño original al salir. (1 punto)
3. Debe ser claro la opción elegida por el jugador y por el ordenador. Se
mostrará quién ha ganado la partida tanto por puntos como por mensaje en
todos los casos posibles (6 puntos):
![Claridad de ejecucion](images/claridad-de-ejecucion-1.jpg)
![Claridad de ejecucion](images/claridad-de-ejecucion-2.jpg)
![Claridad de ejecucion](images/claridad-de-ejecucion-3.jpg)
4. Si se vuelve a introducir otro nombre y reiniciar el juego, todos los
elementos deberán resetearse (1 punto).
5. Se puede cambiar la estética, la estructura y los estilos de la página. Se
tendrá en cuenta la creatividad y la introducción de otros elementos
interactivos. (1 punto).

## Aspectos a tener en cuenta:
1. Escribe el contenido html de la página web.
2. Realiza toda la lógica del programa en un archivo js externo.
3. Aplica estilos mediante una hoja css externa.

Se recomienda una buena organización del proyecto, usando diferentes
carpetas según la necesidad.

Es fundamental que durante la ejecución de la aplicación web no se produzcan
excepciones ni ningún tipo de error. Habrá que gestionarlos y tenerlos en
cuenta desde el código.
