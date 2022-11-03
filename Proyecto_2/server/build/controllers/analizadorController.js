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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analizador = void 0;
var fs = __importStar(require("fs"));
var AST_1 = require("../AST/AST");
var analizadorController = /** @class */ (function () {
    function analizadorController() {
    }
    analizadorController.prototype.read = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var mygramatica, createAST, data, ast, symbols, sym, errors, sym2;
            return __generator(this, function (_a) {
                mygramatica = require('../../src/Gramatica/Gramatica');
                createAST = new AST_1.ASTC();
                data = req.body.txt;
                try {
                    ast = mygramatica.parse(data.toString());
                    console.log(ast);
                    createAST.data(ast);
                    createAST.graficar();
                    symbols = require('../../src/Gramatica/Gramatica').tablaSimbolos;
                    createAST.creaTablaSimbolos(symbols);
                    sym = require('../../src/Gramatica/Gramatica').clear1;
                    sym();
                    res.json({ message: 'OK' });
                }
                catch (ex) {
                    errors = require('../../src/Gramatica/Gramatica').tablaErrores;
                    console.log(errors);
                    createAST.creaTablaErrores(errors);
                    sym2 = require('../../src/Gramatica/Gramatica').clear2;
                    sym2();
                    console.log("Hubo un error al analizar");
                    res.json({ message: 'Errores' });
                }
                return [2 /*return*/];
            });
        });
    };
    analizadorController.prototype.createFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, fichero;
            return __generator(this, function (_a) {
                data = req.body.txt;
                console.log(data);
                try {
                    fichero = fs.writeFileSync("./src/miArchivo.olc", data.toString(), { flag: 'w', });
                }
                catch (error) {
                    console.log("error al generar el olc");
                }
                res.json({ message: 'OK' });
                return [2 /*return*/];
            });
        });
    };
    analizadorController.prototype.getAST = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.sendFile("arbol.png", { root: 'C:\\Users\\Moises\\Documents\\NetBeansProjects\\Proyecto_2\\server' });
                }
                catch (ex) {
                    //si hay algún error
                    res.json({ message: 'Errores' });
                }
                return [2 /*return*/];
            });
        });
    };
    analizadorController.prototype.getSimbolos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.sendFile("simbolos.png", { root: 'C:\\Users\\Moises\\Documents\\NetBeansProjects\\Proyecto_2\\server' });
                }
                catch (ex) {
                    //si hay algún error
                    res.json({ message: 'Errores' });
                }
                return [2 /*return*/];
            });
        });
    };
    analizadorController.prototype.getErrores = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.sendFile("errores.png", { root: 'C:\\Users\\Moises\\Documents\\NetBeansProjects\\Proyecto_2\\server' });
                }
                catch (ex) {
                    //si hay algún error
                    res.json({ message: 'Errores' });
                }
                return [2 /*return*/];
            });
        });
    };
    return analizadorController;
}());
exports.analizador = new analizadorController();
