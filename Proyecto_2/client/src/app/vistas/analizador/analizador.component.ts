import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';
import { EntradaI } from 'src/app/Models/Entrada';
import { ResponseI } from 'src/app/Models/response.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-analizador',
  templateUrl: './analizador.component.html',
  styleUrls: ['./analizador.component.css']
})
export class AnalizadorComponent implements OnInit {
  id = ""
  data = ""
  na!:any;

  //conexion al form del html
  get_form = new FormGroup({
    txt:new FormControl(''),
    titulo:new FormControl('')
  });

  entrada:any;
  exp:any;
  result:any [] = [];
  txtIn:any;
  txtOut:any;

  constructor(private api:ApiService,activateRouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }

  getEntrada(form:any){
    //Método que recibe el texto (se guardá en form)
    this.api.entrada(form).subscribe((data:any)=>{   

      //Se comprueba el estado para poder ver ast y tablas
      if(data.message=='OK'){
        alert('Análisis correcto');
        localStorage.setItem("Estado","Correcto")
      }else{
        localStorage.setItem("Estado", "Incorrecto")
        alert('Se han detectado errores');

      }
    })
  }
  
  makeFile(form:any){
    //Método que recibe el texto (se guardá en form)
    this.api.createFile(form).subscribe((data:any)=>{   

      //Se comprueba el estado para poder ver ast y tablas
      if(data.message=='OK'){
        alert('Archivo creado');
        
      }
    })
  }

  openDialog() {
    document.getElementById("archivo")!.click();

  }

  readFile(event: any) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = () => {
      var text = reader.result;
      if (text) {
        this.txtIn = text.toString();
        //agregamos
        this.get_form.setValue({
          "txt": this.txtIn,
          "titulo": " " 
        })
      }
    }
    reader.readAsText(input.files[0]);
    this.txtOut = '';
    console.log('File opened!')
  }


  //Funciones para ver imágenes 
  showAst(){
    var key = localStorage.getItem("Estado")
    if (key=="Correcto") {
      this.router.navigate(["Reportes"])
    }
    else{
      alert("Hay errores en el código")
    }
  }

  showSimbolos(){
    var key = localStorage.getItem("Estado")
    if (key=="Correcto") {
      this.router.navigate(["Simbolos"])
    }
    else{
      alert("Hay errores en el código")
    }
  }

  showErrores(){
    var key = localStorage.getItem("Estado")
    if (key=="Correcto") {
      alert("No hay errores que mostrar")
     
    }
    else{
      this.router.navigate(["Errores"])
    }
  }


 }

