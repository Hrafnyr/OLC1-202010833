"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTC = void 0;
var arbol_1 = require("../arbol/arbol");
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
            case "BREAK":
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + Instruccion[0], padre);
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
                    for (var i_1 = 1; i_1 < Instruccion[1].length; i_1++) {
                        //se omiten comillas y caracteres de escape
                        var tmp1 = Instruccion[1][i_1].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, this.cont1 + "-" + i_1 + "-" + tmp, this.cont1 + "-PARAMETROS");
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
                        var tmp1 = Instruccion[3].replace("\"", "");
                        var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                        this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
                        //Si trae algo más se agrega
                        for (var i_2 = 4; i_2 < Instruccion.length; i_2++) {
                            if (Instruccion[i_2] != undefined) {
                                var tmp1 = Instruccion[i_2].replace("\"", "");
                                var tmp = tmp1.replace("\n", "\\\\n").replace("\\", "\\\\").replace("\t", "\\\\t");
                                this.tree.InsertarRecursivo(this.root, tmp, this.cont1 + "-" + Instruccion[0]);
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
                            for (var i_3 = 4; i_3 < Instruccion.length; i_3++) {
                                var tmp1 = Instruccion[i_3].replace("\"", "");
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
                this.tree.InsertarRecursivo(this.root, Instruccion[1], this.cont1 + "-CONDICION");
                this.tree.InsertarRecursivo(this.root, Instruccion[2], this.cont1 + "-CONDICION");
                this.tree.InsertarRecursivo(this.root, Instruccion[3], this.cont1 + "-CONDICION");
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSTRUCCIONESIF", this.cont1 + "-" + Instruccion[0]);
                //Funcion recursiva para agregar las instrucciones
                this.cont2 = this.cont1;
                for (var i_4 = 0; i_4 < Instruccion[4].length; i_4++) {
                    this.Instrucciones(Instruccion[4][i_4], this.cont2 + "-INSTRUCCIONESIF");
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
                        for (var i_5 = 0; i_5 < Instruccion[5][1].length; i_5++) {
                            this.Instrucciones(Instruccion[5][1][i_5], this.cont2 + "-INSTRUCCIONES-ELSE");
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
                    for (var i_6 = 0; i_6 < Instruccion[2][1].length; i_6++) {
                        this.Instrucciones(Instruccion[2][1][i_6], this.cont2 + "-default");
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
                        for (var i_7 = 0; i_7 < Instruccion[2][2].length; i_7++) {
                            this.Instrucciones(Instruccion[2][2][i_7], this.cont2 + "-INS-CASE");
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
                        for (var i_8 = 0; i_8 < Instruccion[2][0][2].length; i_8++) {
                            this.Instrucciones(Instruccion[2][0][2][i_8], this.cont2 + "-INS-CASE");
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
                        for (var i_9 = 0; i_9 < Instruccion[2][1][1].length; i_9++) {
                            this.Instrucciones(Instruccion[2][1][1][i_9], this.cont2 + "-default");
                            this.cont1++;
                        }
                    }
                }
                this.cont1 = this.cont2;
                this.cont1++;
                break;
            case "WHILE":
            //Casos especiales para ELIF y ELSE
            case "ELIF":
                //El padre ya se creo
                //Se agregan hijos de condicion -> funcional solo para 2 :(
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-CONDICION", padre);
                this.tree.InsertarRecursivo(this.root, Instruccion[1], this.cont1 + "-CONDICION");
                this.tree.InsertarRecursivo(this.root, Instruccion[2], this.cont1 + "-CONDICION");
                this.tree.InsertarRecursivo(this.root, Instruccion[3], this.cont1 + "-CONDICION");
                this.tree.InsertarRecursivo(this.root, this.cont1 + "-INSTRUCCIONESELIF", padre);
                this.cont2 = this.cont1;
                for (var i_10 = 0; i_10 < Instruccion[4].length; i_10++) {
                    this.Instrucciones(Instruccion[4][i_10], this.cont2 + "-INSTRUCCIONESELIF");
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
                        for (var i_11 = 0; i_11 < Instruccion[5][1].length; i_11++) {
                            this.Instrucciones(Instruccion[5][1][i_11], this.cont2 + "-INSTRUCCIONES-ELSE");
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
                for (var i_12 = 0; i_12 < Instruccion[2].length; i_12++) {
                    this.Instrucciones(Instruccion[2][i_12], this.cont2 + "-INS-CASE");
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
    return ASTC;
}());
exports.ASTC = ASTC;
