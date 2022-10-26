import {Request,Response} from 'express';
import * as fs from 'fs';

class analizadorController {

    public getFile(req:Request,res:Response){
        const mygramatica = require('../../src/jison/gramatica'); 
        fs.readFile('./src/jison/pruebas.txt',(err,data)=>{
            //si hay un error
            if (err) throw err;

            //si no hay error
            console.log("Todo esta bien:");
            mygramatica.parse(data.toString())
            
        })
        res.send('Analizado')
    }
}

export const analizador = new analizadorController();