import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Observable } from 'rxjs';
import { EntradaI } from 'src/app/Models/Entrada';
import { ResponseI } from 'src/app/Models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Api_Uri = "http://localhost:3000/";
  
  constructor(private http: HttpClient) { }

  entrada(form:EntradaI): Observable<ResponseI>{
    
    //form trae la información

    let direccion = this.Api_Uri + "analizar"
    return this.http.post<any>(direccion,form);
  }

  createFile(form:EntradaI): Observable<ResponseI>{
    
    //form trae la información

    let direccion = this.Api_Uri + "analizar/createFile"
    return this.http.post<any>(direccion,form);
  }
  

  

}


