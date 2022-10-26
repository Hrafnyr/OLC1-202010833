"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //Dependencias para desarrollo
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const analizadorRuta_1 = __importDefault(require("./routes/analizadorRuta"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config(); //Llama la configuracion
        this.routes(); //Llama las rutas
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); //Asignacion de puerto, si hay uno predeterminado lo asigna, si no entonces se va la puerto 3000
        this.app.use(morgan_1.default('dev')); //Con estos modulos se puede visualizar las peticiones del servidor
        this.app.use(cors_1.default()); //permite que los recursos restringidos de una pagina web se soliciten desde otro sitio fuera del dominio
        this.app.use(express_1.default.json()); //Con esta configuracion se entienden los formatos json
        this.app.use(express_1.default.urlencoded({ extended: false })); //En caso de acceder a formularios hmtl
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/analizar', analizadorRuta_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}
const server = new Server(); //Guardar el server en una constante
server.start();
