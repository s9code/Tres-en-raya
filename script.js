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
    const computadora = crearJugador("Computadora", "O");
    // Inicialización del jugador actual
    let jugadorActual = jugador;

    // Función que se expondrá al exterior
    function jugarRonda(posicion) {
        // Verificar si la jugada es válida
        const JugadaValida = GameBoard.colocarFicha(posicion, jugadorActual.ficha);
        // Si la jugada es válida, cambiar el turno
        if (JugadaValida === true) {
            if (jugadorActual === jugador) {
                jugadorActual = computadora;
            } else {
                jugadorActual = jugador;
            };
        };
        // Retornamos la jugada
        return {
            JugadaValida
        };
    }
    // Devolvemos un objeto con los métodos públicos para poder acceder a ellos desde fuera
    return {
        jugarRonda
    };
})();
