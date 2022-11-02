
export class Nodo {
    //atributos
    public valor:string;
    public contHijos:number;
    public hijos: Nodo[];
    
    constructor(dato:string){
        this.valor = dato;
        this.contHijos = 0;
        this.hijos = [];
    }
    
    public aumentarHijo(nodo:Nodo):void{
        this.hijos.push(nodo);
        this.contHijos++;
    }
    
    public getValor():string{
        return this.valor;
    }
    
    public setValor(dato:string):void{
        this.valor = dato;
    }
    
    public verNodo():void{
        console.log("{"+this.valor+" Hijos: "+this.contHijos+"}");
    }
}