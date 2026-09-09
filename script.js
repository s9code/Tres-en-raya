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
        }
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
    }

})();