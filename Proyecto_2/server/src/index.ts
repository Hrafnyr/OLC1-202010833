import express, { Application } from 'express'; //Dependencias para desarrollo
import analizadorRuta from './routes/analizadorRuta';
import morgan from 'morgan';
import cors from 'cors';

class Server {

    public app: Application; //Declaracion de aplicacion, se indica que es de tipo aplicacion

    constructor(){ //Constructor para que al momento de iniciar se ejecuta primero
        this.app = express();
        this.config(); //Llama la configuracion
        this.routes(); //Llama las rutas
    }

    config():void{ 
        this.app.set('port', process.env.PORT ||3000); //Asignacion de puerto, si hay uno predeterminado lo asigna, si no entonces se va la puerto 3000
        this.app.use(morgan('dev')); //Con estos modulos se puede visualizar las peticiones del servidor
        this.app.use(cors());  //permite que los recursos restringidos de una pagina web se soliciten desde otro sitio fuera del dominio
        this.app.use(express.json()); //Con esta configuracion se entienden los formatos json
        this.app.use(express.urlencoded({extended: false})); //En caso de acceder a formularios hmtl
    }

    routes():void{  //Guarda las rutas
        this.app.use('/analizar',analizadorRuta)
        
    }

    start():void{ //Inicia el servdidor
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port',this.app.get('port'));
        });
    }
}

const server = new Server(); //Guardar  el server en una constante

server.start()