import { response, Router } from "express"; //Importar router, metodo que devuelve un objeto con las rutas
import {analizador} from '../controllers/analizadoresController';

class analizadorRutas{
    public router: Router = Router(); //Almacena un objeto que devuelve el método router

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',analizador.getFile); //Ruta para obtener texto
    }
}

const analizadores_ = new analizadorRutas();
export default analizadores_.router;