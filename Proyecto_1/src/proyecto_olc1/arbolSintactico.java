
package proyecto_olc1;

import java.awt.Desktop;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class arbolSintactico {
   public Nodo raíz;
   
   public Nodo insertarRaiz(String dato) {
      raíz = new Nodo(dato);
      return raíz;
   }
   
   public Nodo getRaiz(){
       return raíz;
   }         
   
   public void verHijosRecursivo(Nodo nodo) {
      for (int i = 0; i < nodo.contHijos; i++) {
	  nodo.hijos[i].verNodo();
	  verHijosRecursivo(nodo.hijos[i]);
      } 
   }
   public void InsertarRecursivo(Nodo nodo, String dato, String padre) {
       
       
      Nodo nuevo = new Nodo(dato);
      if (nodo.getValor().equals(padre)) {
	  nodo.aumentarHijo(nuevo);
      } else {
	  for (int i = 0; i < nodo.contHijos; i++) {
	     if (nodo.hijos[i].getValor().equals(padre)) {
		 nodo.hijos[i].aumentarHijo(nuevo);
	     } else {
		 InsertarRecursivo(nodo.hijos[i], dato, padre);
	     }
	  }
      } 
   }
   
    public boolean verificarExistencia(Nodo nodo, String dato, String padre) {
     
      if (nodo.getValor().equals(padre)) {
          System.out.println("Entrando al padre");
	  return true;
      } else {
	  for (int i = 0; i < nodo.contHijos; i++) {
	     if (nodo.hijos[i].getValor().equals(padre)) {
                 System.out.println("Existe como hijo");
		 return true;
	     } else {
		verificarExistencia(nodo.hijos[i], dato, padre);
	     }
	  }
      }
      System.out.println("No Existe");
      return false;
   }
    
    public void Graficar(){
        String grafica = "digraph G{\n\n" + generarNodos(raíz, "0") + "\n\n}";        
        generarArchivoDot(grafica);

    }
    
    private String generarNodos(Nodo nodo, String i){
        int cont=0; 
        String datos = "";
        String nodoAux = nodo.getValor();
        nodoAux = nodoAux.replace("\"", "");
        datos= "node" + i + "[label = \"" + nodoAux + "\"];\n";
        
        for(int j =0 ; j<=nodo.contHijos-1; j++){
            datos += "node" + i + " -> node" + i + cont + "\n";
            datos += generarNodos(nodo.hijos[j], ""+i+cont);
            cont++;
        }
        
        return datos;
    }
    
    private void generarArchivoDot(String cadena){
        FileWriter fichero = null;
        try{
            fichero = new FileWriter("arbolS.dot");
            fichero.write(cadena);
            fichero.close();
            
            //GenerarJpg();
            crearImagen();
            
        } catch (Exception e) {
            System.out.println("error al generar dot");
            e.printStackTrace();
        }
    }
    
     
    public void crearImagen() throws IOException {
        try {
      
            
        String command = "C:/Users/Moises/Documents/NetBeansProjects/Proyecto_1/ScriptGenerarImagen.py";
     
        ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", command);
        Process p = pb.start();
      
    } catch (IOException e) {
      e.printStackTrace();
    } 
       
     
    }
}
