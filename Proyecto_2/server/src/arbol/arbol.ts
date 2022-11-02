import {Nodo} from './nodo';
import { join } from 'path';
import * as fs from 'fs';

const { exec } = require('node:child_process')

export class AST {
    public Raiz:Nodo;

    constructor(){
        this.Raiz = new Nodo ("None");
    }

    public insertarRaiz(dato:string):Nodo{
        this.Raiz.setValor(dato);
        return this.Raiz;
    }
    
    public getRaiz():Nodo{
        return this.Raiz;
    }         
    
    public verHijosRecursivo(nodo:Nodo):void {
        for (let i = 0; i < nodo.contHijos; i++){
            nodo.hijos[i].verNodo();
            this.verHijosRecursivo(nodo.hijos[i]);
        } 
    }
   
    public InsertarRecursivo(nodo:Nodo,dato:string, padre:string):void{   
        var nuevo:Nodo = new Nodo(dato);
        if (nodo.getValor()===padre) {
            nodo.aumentarHijo(nuevo);
        } else {
            for (let i = 0; i < nodo.contHijos; i++) {
                if (nodo.hijos[i].getValor()===padre) {
                    nodo.hijos[i].aumentarHijo(nuevo);
                } else {
                    this.InsertarRecursivo(nodo.hijos[i], dato, padre);
                }
            }
        } 
    }
     
    public Graficar():void{
        var grafica:string = "digraph G{\n graph [ dpi = 200]; \n" + this.generarNodos(this.Raiz, "0") + "\n\n}";        
        this.generarArchivoDot(grafica);
 
    }
     
    private generarNodos(nodo:Nodo,i:string):string{
        var cont:number = 1; 
        var datos:string = "";
        var nodoAux:string = nodo.getValor();

        nodoAux = nodoAux.replace("\"", "");
        datos = "node" + i + "[label = \"" + nodoAux + "\" shape=\"box\"];\n";
         
        for(let j = 0 ; j<=nodo.contHijos-1; j++){
            datos += "node" + i + " -> node" + i + cont +j + "\n";
            datos += this.generarNodos(nodo.hijos[j], i+cont+j);
            cont++;
        }
         
        return datos;
   }
     
    private generarArchivoDot(cadena:string):void{
        try{
            var fichero = fs.writeFileSync(join(__dirname,"arbol.dot"), cadena, {flag: 'w',});
    
            //Generarpng();
            this.crearImagen();
            
        } catch (error) {
            console.log("error al generar dot");
        }
   }
     
   public crearImagen():void{
        var path = join(__dirname,"arbol.dot");
        //dot -Tpng arbol.dot -o arbols.png
        exec('dot -Tpng '+path+' -o arbol.png', (err:any, output:any) => {
            if (err) {
                console.error("could not execute command: ", err)
                return
            }
            console.log("Output: \n", output)
        })
   }
    
}

