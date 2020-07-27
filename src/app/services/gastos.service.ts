import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  header = {
    'Content-Type': 'application/json',
    'Authorization': ""
    }

  constructor(private http: HttpClient) { }

  getGastos(token: string, idCategoria: number){
    this.header.Authorization = "Bearer " + token;
    return this.http.get(`${URL}/api/gastos/${idCategoria}`, {headers: this.header});
  }

  addGasto(token: string, nombre: string, idCategoria: number){
    this.header.Authorization = "Bearer " + token;
    return this.http.post(`${URL}/api/gastos/${idCategoria}`, {"nombre": nombre}, {headers: this.header} )
  }

  delteGasto(token: string, idGasto: number){
    this.header.Authorization = "Bearer " + token;
    return this.http.delete(`${URL}/api/gastos/${idGasto}`, { headers: this.header });
  }

  updateCategoria(token: string, idGasto: number, nombre: string){
    this.header.Authorization = "Bearer " + token;
    return this.http.put(`${URL}/api/gastos/${idGasto}`,{"nombre": nombre}, { headers: this.header });
  }
}
