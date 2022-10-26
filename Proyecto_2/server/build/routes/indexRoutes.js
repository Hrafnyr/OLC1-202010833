"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //Importar router, metodo que devuelve un objeto con las rutas
const indexController_1 = require("../controllers/indexController");
class indexRoutes {
    constructor() {
        this.router = express_1.Router(); //Almacena un objeto que devuelve el método router
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.IndexController.index); //Ruta inicial de la aplicación
    }
}
const indexR = new indexRoutes();
exports.default = indexR.router;
