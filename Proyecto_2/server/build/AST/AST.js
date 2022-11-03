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
exports.ASTC = void 0;
var arbol_1 = require("../arbol/arbol");
var path_1 = require("path");
var exec = require('node:child_process').exec;
var fs = __importStar(require("fs"));
var ASTC = /** @class */ (function () {
    function ASTC() {
        this.tree = new arbol_1.AST();
        this.root = this.tree.insertarRaiz("Raiz");
        this.cont1 = 0;
        this.cont2 = 0;
        this.cont3 = 0;
    }
    ASTC.prototype.data = function (data) {
        //Los elementos de data son las instrucciones
        for (var i = 0; i < data.length; i++) {
            this.Instrucciones(data[i], "Raiz");
        }
    };
    //Metodo recursivo que creará los padres y sus hijos 
    ASTC.prototype.Instrucciones = function (Instruccion, padre) {
        //Primera posicion indica el tipo de instrucción
        var ins = Instruccion[0];
        //vemos que opcion debe ser
        switch (ins) {
            //Las posiciones están dadas según la configuración desde jison sobre el []
            case "PUSH":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1], this.cont1 + "-" + Instruccion[0]);
                var tmp1 = Instruccion[2].replace("\"", "");
                var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                this.cont1++;
                break;
            case "POP":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1], this.cont1 + "-" + Instruccion[0]);
                this.cont1++;
                break;
            case "BREAK":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.cont1++;
                break;
            case "LLAMADAS":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1], this.cont1 + "-" + Instruccion[0]);
                for (var i_1 = 2; i_1 < Instruccion.length; i_1++) {
                    if (Instruccion[i_1] != undefined) {
                        if (i_1 == 2) {
                            this.tree.InsertarRecursivo(this.root, this.cont1 + "-ParametrosL", this.cont1 + "-" + Instruccion[0]);
                            var tmp1 = Instruccion[i_1].replace("\"", "");
                            var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                            this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-ParametrosL");
                        }
                        else {
                            var tmp1 = Instruccion[i_1].replace("\"", "");
                            var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                            this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-ParametrosL");
                        }
                    }
                }
                this.cont1++;
                break;
            case "CONTINUE":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.cont1++;
                break;
            case "Return":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                var tmp1 = Instruccion[1].replace("\"", "");
                var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                this.cont1++;
                break;
            case "Run":
                //se crea el padre
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //se agregan sus hijos (id y parametros si tuviera)
                if (Instruccion[1].length == 1) {
                    //no tiene parametros entonces solo id
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1][0], this.cont1 + "-" + Instruccion[0]);
                    this.cont1++;
                }
                else {
                    //tiene parametros
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1][0], this.cont1 + "-" + Instruccion[0]);
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-PARAMETROS", this.cont1 + "-" + Instruccion[0]);
                    for (var i_2 = 1; i_2 < Instruccion[1].length; i_2++) {
                        //se omiten comillas y caracteres de escape
                        var tmp1 = Instruccion[1][i_2].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + i_2 + "-" + tmp, this.cont1 + "-PARAMETROS");
                    }
                    this.cont1++;
                }
                break;
            case "Print":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //se omiten comillas y caracteres de escape
                var tmp1 = Instruccion[1].replace("\"", "");
                var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                this.cont1++;
                break;
            case "Println":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //se omiten comillas y caracteres de escape
                var tmp1 = Instruccion[1].replace("\"", "");
                var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                this.cont1++;
                break;
            case "DECLARACION":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //agregar tipo
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-TIPO", this.cont1 + "-" + Instruccion[0]);
                this.tree.InsertarRecursivo(this.root, Instruccion[1], this.cont1 + "-TIPO");
                //agregar id
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-LISTAID", this.cont1 + "-" + Instruccion[0]);
                var pos = 2;
                while (Instruccion[pos] != "=" && Instruccion[pos] != undefined) {
                    this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-LISTAID");
                    pos++;
                }
                //agregar = y expresion
                while (Instruccion[pos] != undefined) {
                    //ver si vienen casteo
                    if (Instruccion[pos] == "CASTEO") {
                        pos++;
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-CASTEO", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-CASTEO");
                        pos++;
                    }
                    //si viene acceso a vectores de 1 o 2 posiciones
                    if (Instruccion[pos] == "ACCV") {
                        pos++;
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-ACCEDER", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-ACCEDER");
                        pos = pos + 2;
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion1", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-Posicion1");
                        pos++;
                        if (Instruccion[pos] == "Posicion2") {
                            pos++;
                            this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion2", this.cont1 + "-" + Instruccion[0]);
                            this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-Posicion2");
                            pos++;
                        }
                    }
                    //si viene llamadas
                    if (Instruccion[pos] == "LLAMADAS") {
                        pos++;
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-Llamada", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-Llamada");
                        pos++;
                        if (Instruccion[pos] != undefined) {
                            this.tree.InsertarRecursivo(this.root, this.cont1 + "-ParametrosL", this.cont1 + "-Llamada");
                            for (var i_3 = pos; i_3 < Instruccion.length; i_3++) {
                                var tmp1 = Instruccion[i_3].replace("\"", "");
                                var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                                this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-ParametrosL");
                                pos++;
                            }
                        }
                    }
                    if (Instruccion[pos] != undefined) {
                        var tmp1 = Instruccion[pos].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                        pos++;
                    }
                }
                this.cont1++;
                break;
            case "ASIGNACION":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //se agrega id
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1], this.cont1 + "-" + Instruccion[0]);
                //se agrega igual y lo que traiga
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[2], this.cont1 + "-" + Instruccion[0]);
                //verificamos si es decremento o incremento o accesso
                if (Instruccion[3] == "Incremento" || Instruccion[3] == "Decremento") {
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[3], this.cont1 + "-" + Instruccion[0]);
                    this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[4], this.cont1 + "-" + Instruccion[3]);
                }
                else {
                    if (Instruccion[3] == "ACCV") {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-ACCEDER", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[4], this.cont1 + "-ACCEDER");
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion1", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[6], this.cont1 + "-Posicion1");
                        if (Instruccion[7] == "Posicion2") {
                            this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion2", this.cont1 + "-" + Instruccion[0]);
                            this.tree.InsertarRecursivo(this.root, Instruccion[8], this.cont1 + "-Posicion2");
                        }
                    }
                    else {
                        if (Instruccion[3] == "LLAMADAS") {
                            this.tree.InsertarRecursivo(this.root, this.cont1 + "-Llamada", this.cont1 + "-" + Instruccion[0]);
                            this.tree.InsertarRecursivo(this.root, Instruccion[4], this.cont1 + "-Llamada");
                            if (Instruccion[5] != undefined) {
                                this.tree.InsertarRecursivo(this.root, this.cont1 + "-ParametroA", this.cont1 + "-Llamada");
                                for (var i_4 = 5; i_4 < Instruccion.length; i_4++) {
                                    if (Instruccion[i_4] != undefined) {
                                        var tmp1 = Instruccion[i_4].replace("\"", "");
                                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                                        this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-ParametroA");
                                    }
                                }
                            }
                        }
                        else {
                            var tmp1 = Instruccion[3].replace("\"", "");
                            var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                            this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                            //Si trae algo más se agrega
                            for (var i_5 = 4; i_5 < Instruccion.length; i_5++) {
                                if (Instruccion[i_5] != undefined) {
                                    var tmp1 = Instruccion[i_5].replace("\"", "");
                                    var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                                    this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                                }
                            }
                        }
                    }
                }
                this.cont1++;
                break;
            case "Incremento":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //se agrega id
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1], this.cont1 + "-" + Instruccion[0]);
                this.cont1++;
                break;
            case "Decremento":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //se agrega id
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1], this.cont1 + "-" + Instruccion[0]);
                this.cont1++;
                break;
            case "Vector":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //hijos 
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-TIPO", this.cont1 + "-" + Instruccion[0]);
                this.tree.InsertarRecursivo(this.root, Instruccion[1], this.cont1 + "-TIPO");
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-ID", this.cont1 + "-" + Instruccion[0]);
                this.tree.InsertarRecursivo(this.root, Instruccion[2], this.cont1 + "-ID");
                //vemos si es tipo 1 o tipo2
                if (Instruccion[3] == "Tamaño1") {
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-Tamaño", this.cont1 + "-" + Instruccion[0]);
                    if (Instruccion[4] == "CASTEO") {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-CASTEO", this.cont1 + "-Tamaño");
                        var tmp1 = Instruccion[5].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-CASTEO");
                    }
                    else {
                        this.tree.InsertarRecursivo(this.root, Instruccion[4], this.cont1 + "-Tamaño");
                    }
                }
                else {
                    if (Instruccion[3] == "toCharArray") {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-toCharArray", this.cont1 + "-" + Instruccion[0]);
                        var tmp1 = Instruccion[4].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-toCharArray");
                    }
                    else {
                        if (Instruccion[3] == "Valores1") {
                            this.tree.InsertarRecursivo(this.root, this.cont1 + "-Valores1", this.cont1 + "-" + Instruccion[0]);
                            for (var i_6 = 4; i_6 < Instruccion.length; i_6++) {
                                var tmp1 = Instruccion[i_6].replace("\"", "");
                                var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                                this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-Valores1");
                            }
                        }
                    }
                }
                if (Instruccion[3] == "Tamaño2") {
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-Bidimensional", this.cont1 + "-" + Instruccion[0]);
                    this.tree.InsertarRecursivo(this.root, Instruccion[4], this.cont1 + "-Bidimensional");
                    this.tree.InsertarRecursivo(this.root, Instruccion[5], this.cont1 + "-Bidimensional");
                }
                else {
                    if (Instruccion[3] == "ValoresP1") {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-ValoresP1", this.cont1 + "-" + Instruccion[0]);
                        var i = 4;
                        while (Instruccion[i] != "ValoresP2") {
                            var tmp1 = Instruccion[i].replace("\"", "");
                            var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                            this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-ValoresP1");
                            i++;
                        }
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-ValoresP2", this.cont1 + "-" + Instruccion[0]);
                        i++;
                        while (Instruccion[i] != undefined) {
                            var tmp1 = Instruccion[i].replace("\"", "");
                            var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                            this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-ValoresP2");
                            i++;
                        }
                    }
                    else {
                        this.tree.InsertarRecursivo(this.root, Instruccion[4], this.cont1 + "-Tamaño");
                    }
                }
                this.cont1++;
                break;
            case "ModificarVector":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-ID", this.cont1 + "-" + Instruccion[0]);
                this.tree.InsertarRecursivo(this.root, Instruccion[1], this.cont1 + "-ID");
                var pos = 2;
                if (Instruccion[2] == "Posicion1") {
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion1", this.cont1 + "-" + Instruccion[0]);
                    this.tree.InsertarRecursivo(this.root, Instruccion[3], this.cont1 + "-Posicion1");
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion2", this.cont1 + "-" + Instruccion[0]);
                    this.tree.InsertarRecursivo(this.root, Instruccion[5], this.cont1 + "-Posicion2");
                    this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[6], this.cont1 + "-" + Instruccion[0]);
                    pos = 7;
                }
                else {
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion1", this.cont1 + "-" + Instruccion[0]);
                    this.tree.InsertarRecursivo(this.root, Instruccion[2], this.cont1 + "-Posicion1");
                    this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[3], this.cont1 + "-" + Instruccion[0]);
                    pos = 4;
                }
                //Agregar expresiones simples
                //agregar = y expresion
                while (Instruccion[pos] != undefined) {
                    //ver si vienen casteo
                    if (Instruccion[pos] == "CASTEO") {
                        pos++;
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-CASTEO", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-CASTEO");
                        pos++;
                    }
                    //si viene acceso a vectores de 1 o 2 posiciones
                    if (Instruccion[pos] == "ACCV") {
                        pos++;
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-ACCEDER", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-ACCEDER");
                        pos = pos + 2;
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion1", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-Posicion1");
                        pos++;
                        if (Instruccion[pos] == "Posicion2") {
                            pos++;
                            this.tree.InsertarRecursivo(this.root, this.cont1 + "-Posicion2", this.cont1 + "-" + Instruccion[0]);
                            this.tree.InsertarRecursivo(this.root, Instruccion[pos], this.cont1 + "-Posicion2");
                            pos++;
                        }
                    }
                    if (Instruccion[pos] != undefined) {
                        var tmp1 = Instruccion[pos].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                        pos++;
                    }
                }
                this.cont1++;
                break;
            case "IF":
                //se crea el padre y lo que imprime
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //Se agregan hijos de condicion -> funcional solo para 2 :(
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-CONDICION", this.cont1 + "-" + Instruccion[0]);
                for (var index = 1; index < 4; index++) {
                    var tmp1 = Instruccion[index].replace("\"", "");
                    var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                    this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-CONDICION");
                }
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSTRUCCIONESIF", this.cont1 + "-" + Instruccion[0]);
                //Funcion recursiva para agregar las instrucciones
                this.cont2 = this.cont1;
                for (var i_7 = 0; i_7 < Instruccion[4].length; i_7++) {
                    this.Instrucciones(Instruccion[4][i_7], this.cont2 + "-INSTRUCCIONESIF");
                    this.cont1++;
                }
                //verificar si tiene Bloque elif o else
                if (Instruccion[5] != undefined) {
                    if (Instruccion[5][0] == "ELIF") {
                        this.tree.InsertarRecursivo(this.root, this.cont2 + "-ELIF", this.cont2 + "-" + Instruccion[0]);
                        this.Instrucciones(Instruccion[5], this.cont2 + "-ELIF");
                    }
                    if (Instruccion[5][0] == "ELSE") {
                        this.tree.InsertarRecursivo(this.root, this.cont2 + "-ELSE", this.cont2 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, this.cont2 + "-INSTRUCCIONES-ELSE", this.cont2 + "-ELSE");
                        //Funcion recursiva para agregar las instrucciones
                        for (var i_8 = 0; i_8 < Instruccion[5][1].length; i_8++) {
                            this.Instrucciones(Instruccion[5][1][i_8], this.cont2 + "-INSTRUCCIONES-ELSE");
                            this.cont1++;
                        }
                    }
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            case "SWITCH":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-EXPRESION", this.cont1 + "-" + Instruccion[0]);
                this.tree.InsertarRecursivo(this.root, Instruccion[1], this.cont1 + "-EXPRESION");
                //ahora vemos sus elementos
                var aux = this.cont1;
                var flag1 = 0;
                this.cont2 = this.cont1;
                //Este bloque se ejecuta si viene solo default
                if (Instruccion[2][0] == "DEFAULT") {
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-default", this.cont1 + "-" + Instruccion[0]);
                    //instrucciones del default
                    for (var i_9 = 0; i_9 < Instruccion[2][1].length; i_9++) {
                        this.Instrucciones(Instruccion[2][1][i_9], this.cont2 + "-default");
                        this.cont1++;
                    }
                    flag1 = 1;
                }
                else {
                    //si solo vienen los cases
                    if (Instruccion[2][0] == "CASE") {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-CASE", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, Instruccion[2][1], this.cont1 + "-CASE");
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-INS-CASE", this.cont1 + "-CASE");
                        for (var i_10 = 0; i_10 < Instruccion[2][2].length; i_10++) {
                            this.Instrucciones(Instruccion[2][2][i_10], this.cont2 + "-INS-CASE");
                            this.cont1++;
                        }
                        //vemos si vienen mas case
                        var posS = 3;
                        while (Instruccion[2][posS] != undefined) {
                            this.Instrucciones(Instruccion[2][posS], aux + "-" + Instruccion[0]);
                            this.cont1++;
                            posS++;
                        }
                        flag1 = 1;
                    }
                }
                if (flag1 == 0) {
                    //Este bloque se ejecuta solo si vienen case y default
                    if (Instruccion[2][0][0] == "CASE") {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-CASE", this.cont1 + "-" + Instruccion[0]);
                        aux = this.cont1;
                        this.tree.InsertarRecursivo(this.root, Instruccion[2][0][1], this.cont1 + "-CASE");
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-INS-CASE", this.cont1 + "-CASE");
                        for (var i_11 = 0; i_11 < Instruccion[2][0][2].length; i_11++) {
                            this.Instrucciones(Instruccion[2][0][2][i_11], this.cont2 + "-INS-CASE");
                            this.cont1++;
                        }
                        //vemos si vienen mas case
                        var posS = 3;
                        while (Instruccion[2][0][posS] != undefined) {
                            this.Instrucciones(Instruccion[2][0][posS], aux + "-" + Instruccion[0]);
                            this.cont1++;
                            posS++;
                        }
                    }
                    //Este bloque se ejecuta si vienen case y default
                    if (Instruccion[2][1][0] == "DEFAULT") {
                        console.log("viene default");
                        this.tree.InsertarRecursivo(this.root, this.cont2 + "-default", aux + "-" + Instruccion[0]);
                        //instrucciones del default
                        for (var i_12 = 0; i_12 < Instruccion[2][1][1].length; i_12++) {
                            this.Instrucciones(Instruccion[2][1][1][i_12], this.cont2 + "-default");
                            this.cont1++;
                        }
                    }
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            case "WHILE":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //agregamos la condicion 
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-CONDICIONW", this.cont1 + "-" + Instruccion[0]);
                for (var index = 1; index < 4; index++) {
                    var tmp1 = Instruccion[index].replace("\"", "");
                    var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                    this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-CONDICIONW");
                }
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSWhile", this.cont1 + "-" + Instruccion[0]);
                //Funcion recursiva para agregar las instrucciones
                this.cont2 = this.cont1;
                for (var i_13 = 0; i_13 < Instruccion[4].length; i_13++) {
                    this.Instrucciones(Instruccion[4][i_13], this.cont2 + "-INSWhile");
                    this.cont1++;
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            case "FOR":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //Agregar datos
                for (var i_14 = 0; i_14 < Instruccion[1].length; i_14++) {
                    if (i_14 == 0) {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-Cond1", this.cont1 + "-" + Instruccion[0]);
                    }
                    else {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[1][i_14], this.cont1 + "-Cond1");
                    }
                }
                //Agregar datos
                for (var i_15 = 0; i_15 < Instruccion[2].length; i_15++) {
                    if (i_15 == 0) {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-Cond2", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[2][i_15], this.cont1 + "-Cond2");
                    }
                    else {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[2][i_15], this.cont1 + "-Cond2");
                    }
                }
                //Agregar datos
                for (var i_16 = 0; i_16 < Instruccion[3].length; i_16++) {
                    if (i_16 == 0) {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-Cond3", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[3][0], this.cont1 + "-Cond3");
                    }
                    else {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[3][i_16], this.cont1 + Instruccion[3][0]);
                    }
                }
                //Funcion recursiva para agregar las instrucciones
                this.cont2 = this.cont1;
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-insFor", this.cont1 + "-" + Instruccion[0]);
                for (var i_17 = 0; i_17 < Instruccion[4].length; i_17++) {
                    this.Instrucciones(Instruccion[4][i_17], this.cont2 + "-insFor");
                    this.cont1++;
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            case "DOWHILE":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //Funcion recursiva para agregar las instrucciones
                this.cont2 = this.cont1;
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-insDo", this.cont1 + "-" + Instruccion[0]);
                for (var i_18 = 0; i_18 < Instruccion[1].length; i_18++) {
                    this.Instrucciones(Instruccion[1][i_18], this.cont2 + "-insDo");
                    this.cont1++;
                }
                this.cont1 = this.cont2;
                //Agregar condicion while
                for (var i_19 = 2; i_19 < Instruccion.length; i_19++) {
                    if (i_19 == 2) {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[i_19], this.cont1 + "-" + Instruccion[0]);
                    }
                    else {
                        var tmp1 = Instruccion[i_19].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + Instruccion[2]);
                    }
                }
                this.cont1++;
                break;
            case "DOUNTIL":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                //Funcion recursiva para agregar las instrucciones
                this.cont2 = this.cont1;
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-insDoUntil", this.cont1 + "-" + Instruccion[0]);
                for (var i_20 = 0; i_20 < Instruccion[1].length; i_20++) {
                    this.Instrucciones(Instruccion[1][i_20], this.cont2 + "-insDoUntil");
                    this.cont1++;
                }
                this.cont1 = this.cont2;
                //Agregar condicion Hasta
                for (var i_21 = 2; i_21 < Instruccion.length; i_21++) {
                    if (i_21 == 2) {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + Instruccion[i_21], this.cont1 + "-" + Instruccion[0]);
                    }
                    else {
                        var tmp1 = Instruccion[i_21].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + Instruccion[2]);
                    }
                }
                this.cont1++;
                break;
            case "FUNCION":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-Nombre", this.cont1 + "-" + Instruccion[0]);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1], this.cont1 + "-Nombre");
                //vemos si tiene parametros
                if (Instruccion[2] == "PARAMETROS") {
                    //agregamos parametros
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-ParametrosF", this.cont1 + "-" + Instruccion[0]);
                    for (var i_22 = 0; i_22 < Instruccion[3].length; i_22++) {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[3][i_22], this.cont1 + "-ParametrosF");
                    }
                    //Agregamos el tipo
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-TipoF", this.cont1 + "-" + Instruccion[0]);
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[4], this.cont1 + "-TipoF");
                    //Funcion recursiva para agregar las instrucciones
                    this.cont2 = this.cont1;
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSFuncion", this.cont1 + "-" + Instruccion[0]);
                    for (var i_23 = 0; i_23 < Instruccion[5].length; i_23++) {
                        this.Instrucciones(Instruccion[5][i_23], this.cont2 + "-INSFuncion");
                        this.cont1++;
                    }
                }
                else {
                    //Agregamos el tipo
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-TipoF", this.cont1 + "-" + Instruccion[0]);
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[2], this.cont1 + "-TipoF");
                    //Funcion recursiva para agregar las instrucciones
                    this.cont2 = this.cont1;
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSFuncion", this.cont1 + "-" + Instruccion[0]);
                    for (var i_24 = 0; i_24 < Instruccion[3].length; i_24++) {
                        this.Instrucciones(Instruccion[3][i_24], this.cont2 + "-INSFuncion");
                        this.cont1++;
                    }
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            case "METODO":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-NombreM", this.cont1 + "-" + Instruccion[0]);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[1], this.cont1 + "-NombreM");
                //Vemos si tiene parametros o no
                if (Instruccion[2] == "PARAMETROS") {
                    //agregamos parametros
                    this.tree.InsertarRecursivo(this.root, this.cont1 + "-ParametrosM", this.cont1 + "-" + Instruccion[0]);
                    for (var i_25 = 0; i_25 < Instruccion[3].length; i_25++) {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[3][i_25], this.cont1 + "-ParametrosM");
                    }
                    this.cont2 = this.cont1;
                    //Vemos si tiene tipo void o no
                    if (Instruccion[4] == "VOID") {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-TipoM", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[4], this.cont1 + "-TipoM");
                        //Funcion recursiva para agregar las instrucciones
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSMetodo", this.cont1 + "-" + Instruccion[0]);
                        for (var i_26 = 0; i_26 < Instruccion[5].length; i_26++) {
                            this.Instrucciones(Instruccion[5][i_26], this.cont2 + "-INSMetodo");
                            this.cont1++;
                        }
                    }
                    else {
                        //Funcion recursiva para agregar las instrucciones
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSMetodo", this.cont1 + "-" + Instruccion[0]);
                        for (var i_27 = 0; i_27 < Instruccion[4].length; i_27++) {
                            this.Instrucciones(Instruccion[4][i_27], this.cont2 + "-INSMetodo");
                            this.cont1++;
                        }
                    }
                }
                else {
                    //Vemos si tiene tipo void o no
                    this.cont2 = this.cont1;
                    if (Instruccion[2] == "VOID") {
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-TipoM", this.cont1 + "-" + Instruccion[0]);
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[2], this.cont1 + "-TipoM");
                        //Funcion recursiva para agregar las instrucciones
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSMetodo", this.cont1 + "-" + Instruccion[0]);
                        for (var i_28 = 0; i_28 < Instruccion[3].length; i_28++) {
                            this.Instrucciones(Instruccion[3][i_28], this.cont2 + "-INSMetodo");
                            this.cont1++;
                        }
                    }
                    else {
                        //Funcion recursiva para agregar las instrucciones
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSMetodo", this.cont1 + "-" + Instruccion[0]);
                        for (var i_29 = 0; i_29 < Instruccion[2].length; i_29++) {
                            this.Instrucciones(Instruccion[2][i_29], this.cont2 + "-INSMetodo");
                            this.cont1++;
                        }
                    }
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            //Casos especiales para ELIF y ELSE
            case "ELIF":
                //El padre ya se creo
                //Se agregan hijos de condicion -> funcional solo para 2 :(
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-CONDICION", padre);
                for (var index = 1; index < 4; index++) {
                    var tmp1 = Instruccion[index].replace("\"", "");
                    var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                    this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-CONDICION");
                }
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSTRUCCIONESELIF", padre);
                this.cont2 = this.cont1;
                for (var i_30 = 0; i_30 < Instruccion[4].length; i_30++) {
                    this.Instrucciones(Instruccion[4][i_30], this.cont2 + "-INSTRUCCIONESELIF");
                    this.cont1++;
                }
                //verificar si tiene Bloque elif o else
                if (Instruccion[5] != undefined) {
                    if (Instruccion[5][0] == "ELIF") {
                        this.tree.InsertarRecursivo(this.root, this.cont2 + "-ELIF", padre);
                        this.Instrucciones(Instruccion[5], this.cont2 + "-ELIF");
                    }
                    if (Instruccion[5][0] == "ELSE") {
                        this.tree.InsertarRecursivo(this.root, this.cont2 + "-ELSE", padre);
                        this.tree.InsertarRecursivo(this.root, this.cont2 + "-INSTRUCCIONES-ELSE", this.cont2 + "-ELSE");
                        //Funcion recursiva para agregar las instrucciones
                        for (var i_31 = 0; i_31 < Instruccion[5][1].length; i_31++) {
                            this.Instrucciones(Instruccion[5][1][i_31], this.cont2 + "-INSTRUCCIONES-ELSE");
                            this.cont1++;
                        }
                    }
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            case "CASE":
                console.log(Instruccion);
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-CASE", padre);
                this.tree.InsertarRecursivo(this.root, Instruccion[1], this.cont1 + "-CASE");
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-INS-CASE", this.cont1 + "-CASE");
                this.cont2 = this.cont1;
                for (var i_32 = 0; i_32 < Instruccion[2].length; i_32++) {
                    this.Instrucciones(Instruccion[2][i_32], this.cont2 + "-INS-CASE");
                    this.cont1++;
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            default:
                break;
        }
    };
    ASTC.prototype.graficar = function () {
        this.tree.Graficar();
    };
    //id,tipo1,tipo2,linea,columna
    ASTC.prototype.creaTablaSimbolos = function (listaSymbolos) {
        var cabecera = "";
        cabecera += "digraph G {\ngraph[dpi = 200]\n";
        cabecera += "node[shape=box fontsize=12 fillcolor=\"darkseagreen1\" style=\"filled\"];\nlabel=\"Tabla de Errores\";\n";
        cabecera += "nodo [ label = <\n<table border=\"1\">\n<tr>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#f5fca2\">No.</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#cbffd9\">Tipo</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#cbffd9\">Tipo</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">Descripción</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">Fila</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">Columna</td>\n</tr>";
        for (var i = 0; i < listaSymbolos.length; i++) {
            cabecera += "<tr>\n";
            cabecera += "<td align=\"text\" bgcolor=\"#f5fca2\">" + i + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#cbffd9\">" + listaSymbolos[i][0] + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#cbffd9\">" + listaSymbolos[i][1] + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">" + listaSymbolos[i][2] + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#cbffd9\">" + listaSymbolos[i][3] + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">" + listaSymbolos[i][4] + "<br align=\"left\"/></td></tr>";
        }
        cabecera += "\n</table>\n>\n]\n}";
        try {
            var fichero = fs.writeFileSync((0, path_1.join)(__dirname, "simbolos.dot"), cabecera, { flag: 'w', });
            //Generarpng();
            var path = (0, path_1.join)(__dirname, "simbolos.dot");
            //dot -Tpng arbol.dot -o arbols.png
            exec('dot -Tpng ' + path + ' -o simbolos.png', function (err, output) {
                if (err) {
                    console.error("could not execute command: ", err);
                    return;
                }
                console.log("Output: \n", output);
            });
        }
        catch (error) {
            console.log("error al generar dot");
        }
    };
    ASTC.prototype.creaTablaErrores = function (listaErrores) {
        var cabecera = "";
        cabecera += "digraph G {\ngraph[dpi = 200]\n";
        cabecera += "node[shape=box fontsize=12 fillcolor=\"darkseagreen1\" style=\"filled\"];\nlabel=\"Tabla de Errores\";\n";
        cabecera += "nodo [ label = <\n<table border=\"1\">\n<tr>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#f5fca2\">No.</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#cbffd9\">Tipo</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">Descripción</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">Fila</td>\n";
        cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">Columna</td>\n</tr>";
        for (var i = 0; i < listaErrores.length; i++) {
            cabecera += "<tr>\n";
            cabecera += "<td align=\"text\" bgcolor=\"#f5fca2\">" + i + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#cbffd9\">" + listaErrores[i][0] + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">" + listaErrores[i][1] + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#cbffd9\">" + listaErrores[i][2] + "<br align=\"left\"/></td>";
            cabecera += "<td align=\"text\" bgcolor=\"#a8f2f9\">" + listaErrores[i][3] + "<br align=\"left\"/></td></tr>";
        }
        cabecera += "\n</table>\n>\n]\n}";
        try {
            var fichero = fs.writeFileSync((0, path_1.join)(__dirname, "errores.dot"), cabecera, { flag: 'w', });
            //Generarpng();
            var path = (0, path_1.join)(__dirname, "errores.dot");
            //dot -Tpng arbol.dot -o arbols.png
            exec('dot -Tpng ' + path + ' -o errores.png', function (err, output) {
                if (err) {
                    console.error("could not execute command: ", err);
                    return;
                }
                console.log("Output: \n", output);
            });
        }
        catch (error) {
            console.log("error al generar dot");
        }
    };
    return ASTC;
}());
exports.ASTC = ASTC;
