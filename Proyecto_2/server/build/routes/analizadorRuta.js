"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express"); //Importar router, metodo que devuelve un objeto con las rutas
var analizadorController_1 = require("../controllers/analizadorController");
var analizadorRutas = /** @class */ (function () {
    function analizadorRutas() {
        this.router = (0, express_1.Router)(); //Almacena un objeto que devuelve el método router
        this.config();
    }
    analizadorRutas.prototype.config = function () {
        this.router.post('/', analizadorController_1.analizador.read); //Ruta que recibe el texto a analizar
        this.router.post('/createFile', analizadorController_1.analizador.createFile);
    };
    return analizadorRutas;
}());
var analizadores_ = new analizadorRutas();
exports.default = analizadores_.router;
