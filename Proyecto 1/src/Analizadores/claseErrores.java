/*
Clase para guardar errores
 */
package Analizadores;

/**
 @author Moises
 */

public class claseErrores {
    String lexema, tipo, descripcion;
    int fila, columna;

    public claseErrores(String lexema, String tipo, String d, int f, int c){
        this.lexema=lexema;
        this.tipo= tipo;
        this.descripcion=d;
        this.fila=f;
        this.columna=c;
        
    }
    public String getError(){
        return "[ "+this.lexema+ " , "+this.tipo+" , "+this.descripcion+","+this.fila+","+this.columna+"]";
    }
}
