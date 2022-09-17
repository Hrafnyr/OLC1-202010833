
package proyecto_olc1;

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
   
}
