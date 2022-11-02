"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); //Dependencias para desarrollo
var analizadorRuta_1 = __importDefault(require("./routes/analizadorRuta"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.config(); //Llama la configuracion
        this.routes(); //Llama las rutas
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 3000); //Asignacion de puerto, si hay uno predeterminado lo asigna, si no entonces se va la puerto 3000
        this.app.use((0, morgan_1.default)('dev')); //Con estos modulos se puede visualizar las peticiones del servidor
        this.app.use((0, cors_1.default)()); //permite que los recursos restringidos de una pagina web se soliciten desde otro sitio fuera del dominio
        this.app.use(express_1.default.json()); //Con esta configuracion se entienden los formatos json
        this.app.use(express_1.default.urlencoded({ extended: false })); //En caso de acceder a formularios hmtl
    };
    Server.prototype.routes = function () {
        this.app.use('/analizar', analizadorRuta_1.default);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('server on port', _this.app.get('port'));
        });
    };
    return Server;
}());
var server = new Server(); //Guardar  el server en una constante
server.start();
