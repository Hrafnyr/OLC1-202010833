
import { response, Router } from "express"; //Importar router, metodo que devuelve un objeto con las rutas
import {IndexController} from '../controllers/indexController';
class indexRoutes{
    public router: Router = Router(); //Almacena un objeto que devuelve el método router

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',IndexController.index) //Ruta inicial de la aplicación
    }
}

const indexR = new indexRoutes();
export default indexR.router;