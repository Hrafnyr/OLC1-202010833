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
            try {
                //si funciona el analizador
                const ast = mygramatica.parse(data.toString())
                var createAST = new ASTC();
                console.log(ast);
                createAST.data(ast);
                createAST.graficar();
              } catch (error) {
                //si hay algún error
                console.log("Hubo un error al analizar")
            }

            // var tree = new AST();
            // var root = tree.insertarRaiz("0");c
            
            // tree.InsertarRecursivo(root,"1","0");
            // tree.InsertarRecursivo(root,"2","0");
            // tree.InsertarRecursivo(root,"3","0");
            // tree.Raiz.verNodo();
            // tree.verHijosRecursivo(root);
            // tree.Graficar();

        })
        res.send('Analizado')
    }
}

export const analizador = new analizadorController();