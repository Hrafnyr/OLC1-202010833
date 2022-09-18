
package proyecto_olc1;

public class Nodo {
    String valor;
    int contHijos;
    Nodo hijos [];
    Nodo hijosT [];
    
    public Nodo(String dato){
        valor = dato;
        this.contHijos=0;
    }
    
    public void redimensionar(){
        hijosT = new Nodo [contHijos+1];
        for (int i = 0; i < this.contHijos; i++) {
            hijosT[i]= hijos[i];
        }
    }
    
    public void aumentarHijo(Nodo nodo){
        redimensionar();
        hijosT[this.contHijos]= nodo;
        hijos = hijosT;
        this.contHijos++;
    }
    
    public String getValor(){
        return valor;
    }
    
    public void setValor(String dato){
        valor = dato;
    }
    
    public void verNodo(){
        System.out.println("{"+valor+" Hijos: "+String.valueOf(contHijos)+"}");
    }
}
