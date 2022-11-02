"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
var Nodo = /** @class */ (function () {
    function Nodo(dato) {
        this.valor = dato;
        this.contHijos = 0;
        this.hijos = [];
    }
    Nodo.prototype.aumentarHijo = function (nodo) {
        this.hijos.push(nodo);
        this.contHijos++;
    };
    Nodo.prototype.getValor = function () {
        return this.valor;
    };
    Nodo.prototype.setValor = function (dato) {
        this.valor = dato;
    };
    Nodo.prototype.verNodo = function () {
        console.log("{" + this.valor + " Hijos: " + this.contHijos + "}");
    };
    return Nodo;
}());
exports.Nodo = Nodo;
