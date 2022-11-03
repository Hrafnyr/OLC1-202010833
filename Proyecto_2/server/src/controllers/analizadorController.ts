import {Request,Response} from 'express';
import * as fs from 'fs';
import { ASTC } from '../AST/AST';
import { join } from 'path';

class analizadorController {

    public async read(req:Request,res:Response){
        const mygramatica = require('../../src/Gramatica/Gramatica');  //Llamamos al modulo de gramática
        var createAST = new ASTC(); //Instanciamos la estructura que genera ast y tablas
        
        //obtenemos texto que manda el cliente
        const data = req.body.txt;
        
        try {
            //si funciona el analizador
            const ast = mygramatica.parse(data.toString())
            
            console.log(ast);

            createAST.data(ast);
            createAST.graficar();

            //tabla de simbolos
            let symbols = require('../../src/Gramatica/Gramatica').tablaSimbolos;
            createAST.creaTablaSimbolos(symbols);
            res.json({message: 'OK'})

        } catch (ex) {
            //si hay algún error
            let errors = require('../../src/Gramatica/Gramatica').tablaErrores;
            createAST.creaTablaErrores(errors);
            console.log("Hubo un error al analizar")
            res.json({message: 'Errores'})
        }

        
        //Metodo de prueba que lee un archivo específico
        // fs.readFile('./src/Gramatica/entrada.txt',(err,data)=>{
        //     //si hay un error
        //     if (err) throw err;

        //     //si no hay error al leer
        //     console.log("Todo esta bien:");
        //     var createAST = new ASTC();
        //     try {
        //         //si funciona el analizador
        //         const ast = mygramatica.parse(data.toString())
                
        //         console.log(ast);

        //         createAST.data(ast);
        //         createAST.graficar();

        //         //tabla de simbolos
        //         let symbols = require('../../src/Gramatica/Gramatica').tablaSimbolos;
        //         createAST.creaTablaSimbolos(symbols);
        //         res.json({message: 'OK'})

        //     } catch (ex) {
        //     //si hay algún error
        //     let errors = require('../../src/Gramatica/Gramatica').tablaErrores;
        //     createAST.creaTablaErrores(errors);
        //     console.log("Hubo un error al analizar")
        //     res.json({message: 'Errores'})
        //     }

        // })
        
    }

    public async createFile(req:Request,res:Response){
        //obtenemos texto que manda el cliente
        const data = req.body.txt;
        console.log(data)
        try{
            
            var fichero = fs.writeFileSync("./src/miArchivo.olc", data.toString(), {flag: 'w',});
            
        } catch (error) {
            console.log("error al generar el olc");
        }
        res.json({message: 'OK'})
    }
}

export const analizador = new analizadorController();
