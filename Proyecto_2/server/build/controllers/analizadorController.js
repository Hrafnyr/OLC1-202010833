"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analizador = void 0;
var fs = __importStar(require("fs"));
var AST_1 = require("../AST/AST");
var analizadorController = /** @class */ (function () {
    function analizadorController() {
    }
    analizadorController.prototype.getFile = function (req, res) {
        var mygramatica = require('../../src/Gramatica/Gramatica');
        fs.readFile('./src/Gramatica/entrada.txt', function (err, data) {
            //si hay un error
            if (err)
                throw err;
            //si no hay error al leer
            console.log("Todo esta bien:");
            var createAST = new AST_1.ASTC();
            try {
                //si funciona el analizador
                var ast = mygramatica.parse(data.toString());
                console.log(ast);
                createAST.data(ast);
                createAST.graficar();
                //tabla de simbolos
                var symbols = require('../../src/Gramatica/Gramatica').tablaSimbolos;
                createAST.creaTablaSimbolos(symbols);
            }
            catch (error) {
                //si hay algún error
                var errors = require('../../src/Gramatica/Gramatica').tablaErrores;
                createAST.creaTablaErrores(errors);
                console.log("Hubo un error al analizar");
            }
        });
        res.send('Analizado');
    };
    return analizadorController;
}());
exports.analizador = new analizadorController();
