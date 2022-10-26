"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //Importar router, metodo que devuelve un objeto con las rutas
const analizadoresController_1 = require("../controllers/analizadoresController");
class analizadorRutas {
    constructor() {
        this.router = express_1.Router(); //Almacena un objeto que devuelve el método router
        this.config();
    }
    config() {
        this.router.get('/', analizadoresController_1.analizador.getFile); //Ruta para obtener texto
    }
}
const analizadores_ = new analizadorRutas();
exports.default = analizadores_.router;
