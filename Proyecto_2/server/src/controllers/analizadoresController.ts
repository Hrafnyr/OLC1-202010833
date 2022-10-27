import {Request,Response} from 'express';
import * as fs from 'fs';

class analizadorController {

    public getFile(req:Request,res:Response){
        const mygramatica = require('../../src/jison/gramatica'); 
        fs.readFile('./src/jison/pruebas.txt',(err,data)=>{
            //si hay un error
            if (err) throw err;

            //si no hay error al leer
            console.log("Todo esta bien:");
            try {
                //si funciona el analizador
                mygramatica.parse(data.toString())
              } catch (error) {
                //si hay algún error
                console.log("Hubo un error")
            }
        })
        res.send('Analizado')
    }
}

export const analizador = new analizadorController();