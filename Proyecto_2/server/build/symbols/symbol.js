"use strict";
//Clases para guardar informacion
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vectores = exports.Metodos = exports.Funcion = exports.Symbol = void 0;
//Variables
var Symbol = /** @class */ (function () {
    function Symbol(value, clasificacion, tipoDato, entorno, linea, columna) {
        this.value = value;
        this.clasificacion = clasificacion;
        this.tipoDato = tipoDato;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }
    return Symbol;
}());
exports.Symbol = Symbol;
//Funciones
var Funcion = /** @class */ (function () {
    function Funcion(value, clasificacion, tipoDato, entorno, linea, columna) {
        this.value = value;
        this.clasificacion = clasificacion;
        this.tipoDato = tipoDato;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }
    return Funcion;
}());
exports.Funcion = Funcion;
//Metodos
var Metodos = /** @class */ (function () {
    function Metodos(value, clasificacion, tipoDato, entorno, linea, columna) {
        this.value = value;
        this.clasificacion = clasificacion;
        this.tipoDato = tipoDato;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }
    return Metodos;
}());
exports.Metodos = Metodos;
//Vectores
var Vectores = /** @class */ (function () {
    function Vectores(value, clasificacion, tipoDato, entorno, linea, columna) {
        this.value = value;
        this.clasificacion = clasificacion;
        this.tipoDato = tipoDato;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }
    return Vectores;
}());
exports.Vectores = Vectores;
