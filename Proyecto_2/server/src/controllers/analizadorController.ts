import {Request,Response} from 'express';
import * as fs from 'fs';
import { ASTC } from '../AST/AST';

class analizadorController {

    public getFile(req:Request,res:Response){
        const mygramatica = require('../../src/Gramatica/Gramatica'); 
        fs.readFile('./src/Gramatica/entrada.txt',(err,data)=>{
            //si hay un error
            if (err) throw err;

            //si no hay error al leer
            console.log("Todo esta bien:");
            var createAST = new ASTC();
            try {
                //si funciona el analizador
                const ast = mygramatica.parse(data.toString())
                
                console.log(ast);

                createAST.data(ast);
                createAST.graficar();

                //tabla de simbolos
                let symbols = require('../../src/Gramatica/Gramatica').tablaSimbolos;
                createAST.creaTablaSimbolos(symbols);

              } catch (error) {
                //si hay algún error
                let errors = require('../../src/Gramatica/Gramatica').tablaErrores;
                createAST.creaTablaErrores(errors);
                console.log("Hubo un error al analizar")
            }

        })
        res.send('Analizado')
    }
}

export const analizador = new analizadorController();