// Módulo 1: GameBoard (IIFE) para que funcione de manera privada 
// (gracias a closure, las variables dentro de la IIFE no se pueden acceder desde fuera)
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
        reiniciarPartida
    };

})();

// Módulo 2: Factory function que crea jugadores 
// (crear jugadores con nombre y ficha que los identifica)
function crearJugador(nombre, ficha) {
    // Retorna un objeto con el nombre y la ficha del jugador
    return {
        nombre,
        ficha
    };
}

// Módulo 3: GameController (IIFE) que controla el flujo del juego
// (gracias a closure, las variables dentro de la IIFE no se pueden acceder desde fuera)
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

    // Función que se expondrá al exterior
    function jugarRonda(posicion) {
        // Verificar si la jugada es válida
        const JugadaValida = GameBoard.colocarFicha(posicion, jugadorActual.ficha);
        // Si la jugada es válida, cambiar el turno
        if (JugadaValida === true) {
            // Primero comprobamos si con esa jugada alguien ha ganado
            if (comprobarGanador() === true) {
                console.log("Se acabo la partida");
            // Si no hay ganador, comprobamos si hay empate
            } else if (comprobarEmpate() === true){
                console.log("Empate");
            // Si no hay empate, comprobamos si hay ganador
            } else {
                // Si nadie ha ganado todavía, ENTONCES cambiamos el turno
                if (jugadorActual === jugador) {
                    jugadorActual = computadora;
                } else {
                    jugadorActual = jugador;
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
                console.log("Ha ganado el jugador");
                return true;
            }

        };
        // Si no hay tres fichas iguales en ninguna de las combinaciones ganadoras
        return false;
    }

    function comprobarEmpate() {
        const tablero = GameBoard.getCasillas();

        if (tablero.includes("")) {
            return false;
        } else {
            return true;
        }

    }

    // Devolvemos un objeto con los métodos públicos para poder acceder a ellos desde fuera
    return {
        jugarRonda,
        comprobarGanador
    };
})();

GameController.jugarRonda(0); // X en 0
GameController.jugarRonda(6); // O en 6
GameController.jugarRonda(1); // X en 1
GameController.jugarRonda(7); // O en 7
GameController.jugarRonda(2); // X en 2 -> ¡Debería ganar aquí!