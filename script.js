// Módulo 1: GameBoard (IIFE) para que funcione de manera privada 
const GameBoard = (function () {
    
    // Array que representa el tablero
    let casillas = ["", "", "", "", "", "", "", "", ""];
    // Función auxiliar para obtener las casillas 
    function getCasillas() {
        return casillas;
    }
    // Función auxiliar para colocar una ficha 
    function colocarFicha(posicion, ficha) {
        if (casillas[posicion] === "") {
            casillas[posicion] = ficha;
            return true;
        } else {
            return false;
        };
    }
    // Función auxiliar para reiniciar la partida 
    function  reiniciarPartida() {
        return casillas.fill("");
    }

    // Devolvemos un objeto con los métodos públicos para poder acceder a ellos desde fuera
    return {
        getCasillas,
        colocarFicha,
        reiniciarPartida,
    };

})();

// Módulo 2: Factory function que crea jugadores 
function crearJugador(nombre, ficha) {
    // Retorna un objeto con el nombre y la ficha del jugador
    return {
        nombre,
        ficha
    };
}

// Módulo 3: GameController (IIFE) que controla el flujo del juego
const GameController = (function () {
    // Creación de jugadores
    const jugador = crearJugador("Javi", "X");
    // creamos la variable computadora con la factoría de jugadores
    const computadora = crearJugador("Computadora", "O");

    // Combinaciones ganadoras
    const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [2, 5, 8],
        [1, 4, 7],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Inicialización del jugador actual
    let jugadorActual = jugador;

    let juegoActivo = true;

    // Función que se expondrá al exterior
    function jugarRonda(posicion) {
        if (juegoActivo === false) {
            return; // Aborta la función, no deja jugar
        }
        // Verificar si la jugada es válida
        const JugadaValida = GameBoard.colocarFicha(posicion, jugadorActual.ficha);
        // Si la jugada es válida, cambiar el turno
        if (JugadaValida === true) {
            // Primero comprobamos si con esa jugada alguien ha ganado
            if (comprobarGanador() === true) {
                juegoActivo = false;
            // Si no hay ganador, comprobamos si hay empate
            } else if (comprobarEmpate() === true){
                DisplayController.mostrarMensaje("Empate");
                juegoActivo = false;
            // Si no hay empate, comprobamos si hay ganador
            } else {
                // Si nadie ha ganado todavía, ENTONCES cambiamos el turno
                if (jugadorActual === jugador) {
                    jugadorActual = computadora;
                    DisplayController.mostrarMensaje(`Es el turno de ${jugadorActual.nombre}`);
                } else {
                    jugadorActual = jugador;
                    DisplayController.mostrarMensaje(`Es el turno de ${jugadorActual.nombre}`);
                };
            }
        };
        // Retornamos la jugada
        return {
            JugadaValida,

        };
    }

    // Función que comprueba si alguien ha ganado
    function comprobarGanador() {
        // Obtenemos el tablero
        const tablero = GameBoard.getCasillas()
        // Recorremos las combinaciones ganadoras
        for (let i = 0; i < combinacionesGanadoras.length; i++) {
            // Obtenemos las posiciones
            const pos1 = combinacionesGanadoras[i][0];  
            const pos2 = combinacionesGanadoras[i][1];
            const pos3 = combinacionesGanadoras[i][2];

            if (tablero[pos1] === tablero[pos2] && tablero[pos1] === tablero[pos3] && tablero[pos1] !== "") {
                // Si hay tres fichas iguales en una de las combinaciones ganadoras
                DisplayController.mostrarMensaje(`Ha ganado ${jugadorActual.nombre}`);
                return true;
            }

        };
        // Si no hay tres fichas iguales en ninguna de las combinaciones ganadoras
        return false;
    }

    // Función que comprueba si hay empate
    function comprobarEmpate() {
        // Obtenemos el tablero
        const tablero = GameBoard.getCasillas();
        // Comprobamos si hay empate
        if (tablero.includes("")) {
            return false;
        } else {
            return true;
        }

    }

    function reiniciarJuego() {
        GameBoard.reiniciarPartida(); // Vaciamos el array
        jugadorActual = jugador; // Reseteamos el turno
        DisplayController.mostrarMensaje(`Es el turno de ${jugadorActual.nombre}`) // reseteamos el texto
        juegoActivo = true;
    }

    // Devolvemos un objeto con los métodos públicos para poder acceder a ellos desde fuera
    return {
        jugarRonda,
        comprobarGanador,
        reiniciarJuego
    };
})();

// Módulo 4: DisplayController (IIFE) que controla el flujo del juego
const DisplayController = (function() {
    // Obtenemos las casillas de los div de index.html
    const casillas = document.querySelectorAll(".casilla");

    const mensajePartida = document.querySelector(".mensaje-juego");

    const btnReiniciar = document.querySelector("#btn-reiniciar");

    // Función que renderiza el tablero
    function render() {
        // Obtenemos las casillas del GameBoard
        arrayCasillas = GameBoard.getCasillas();
        
        // Recorremos las casillas del GameBoard para mostrarlas en pantalla
        arrayCasillas.forEach(function(ficha, indice) {
            // Las casillas de index.html se actualizan con el texto de las casillas del GameBoard
            casillas[indice].textContent = ficha;
            
        }); 
    }

    // Recorremos las casillas del index.html para añadirles un evento click
    casillas.forEach(function(casilla, indice) {
        // Añadimos el evento click a cada casilla
        casilla.addEventListener("click", () => {
            // Función que llama a jugarRonda de GameController para jugar una ronda
            GameController.jugarRonda(indice);
            // Función que llama a render de DisplayController para pintar el tablero
            render();
        })
    })

    function mostrarMensaje(mensaje) {
        mensajePartida.textContent = mensaje;
    }

    btnReiniciar.addEventListener("click", () => {
        GameController.reiniciarJuego();
        render(); // La pantalla pinta el tablero vacío
    })

    // Devolvemos un objeto con los métodos públicos para poder acceder a ellos desde fuera
        return {
            render,
            mostrarMensaje
        };

})();

DisplayController.render();

