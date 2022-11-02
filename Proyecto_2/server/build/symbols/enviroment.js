"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
var symbol_1 = require("./symbol");
var Env = /** @class */ (function () {
    function Env(anterior) {
        this.anterior = anterior;
        this.tablaSimbolos = new Map();
        this.tablaFuncion = new Map();
        this.tablaMetodo = new Map();
        this.tablaVector = new Map();
    }
    Env.prototype.guardar_variable = function (nombre, clasificacion, entorno, tipo, linea, columna) {
        this.tablaSimbolos.set(nombre, new symbol_1.Symbol(nombre, clasificacion, tipo, entorno, linea, columna));
    };
    return Env;
}());
exports.Env = Env;
