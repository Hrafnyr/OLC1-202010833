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
exports.AST = void 0;
var nodo_1 = require("./nodo");
var path_1 = require("path");
var fs = __importStar(require("fs"));
var exec = require('node:child_process').exec;
var AST = /** @class */ (function () {
    function AST() {
        this.Raiz = new nodo_1.Nodo("None");
    }
    AST.prototype.insertarRaiz = function (dato) {
        this.Raiz.setValor(dato);
        return this.Raiz;
    };
    AST.prototype.getRaiz = function () {
        return this.Raiz;
    };
    AST.prototype.verHijosRecursivo = function (nodo) {
        for (var i = 0; i < nodo.contHijos; i++) {
            nodo.hijos[i].verNodo();
            this.verHijosRecursivo(nodo.hijos[i]);
        }
    };
    AST.prototype.InsertarRecursivo = function (nodo, dato, padre) {
        var nuevo = new nodo_1.Nodo(dato);
        if (nodo.getValor() === padre) {
            nodo.aumentarHijo(nuevo);
        }
        else {
            for (var i = 0; i < nodo.contHijos; i++) {
                if (nodo.hijos[i].getValor() === padre) {
                    nodo.hijos[i].aumentarHijo(nuevo);
                }
                else {
                    this.InsertarRecursivo(nodo.hijos[i], dato, padre);
                }
            }
        }
    };
    AST.prototype.Graficar = function () {
        var grafica = "digraph G{\n graph [ dpi = 200]; \n" + this.generarNodos(this.Raiz, "0") + "\n\n}";
        this.generarArchivoDot(grafica);
    };
    AST.prototype.generarNodos = function (nodo, i) {
        var cont = 1;
        var datos = "";
        var nodoAux = nodo.getValor();
        nodoAux = nodoAux.replace("\"", "");
        datos = "node" + i + "[label = \"" + nodoAux + "\" shape=\"box\"];\n";
        for (var j = 0; j <= nodo.contHijos - 1; j++) {
            datos += "node" + i + " -> node" + i + cont + j + "\n";
            datos += this.generarNodos(nodo.hijos[j], i + cont + j);
            cont++;
        }
        return datos;
    };
    AST.prototype.generarArchivoDot = function (cadena) {
        try {
            var fichero = fs.writeFileSync((0, path_1.join)(__dirname, "arbol.dot"), cadena, { flag: 'w', });
            //Generarpng();
            this.crearImagen();
        }
        catch (error) {
            console.log("error al generar dot");
        }
    };
    AST.prototype.crearImagen = function () {
        var path = (0, path_1.join)(__dirname, "arbol.dot");
        //dot -Tpng arbol.dot -o arbols.png
        exec('dot -Tpng ' + path + ' -o arbol.png', function (err, output) {
            if (err) {
                console.error("could not execute command: ", err);
                return;
            }
            console.log("Output: \n", output);
        });
    };
    return AST;
}());
exports.AST = AST;
