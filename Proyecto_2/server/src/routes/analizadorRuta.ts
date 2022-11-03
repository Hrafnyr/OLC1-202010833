import { response, Router } from "express"; //Importar router, metodo que devuelve un objeto con las rutas
import {analizador} from '../controllers/analizadorController';

class analizadorRutas{
    public router: Router = Router(); //Almacena un objeto que devuelve el método router

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/',analizador.read); //Ruta que recibe el texto a analizar
        this.router.post('/createFile',analizador.createFile);
    }
}

const analizadores_ = new analizadorRutas();
export default analizadores_.router;