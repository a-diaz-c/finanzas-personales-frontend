import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  header = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer "
    }

  constructor( private http: HttpClient ) { }

  getCategorias(token: string){
    this.header.Authorization = "Bearer " + token;
    return this.http.get(`${URL}/api/categorias`, { headers: this.header });
  }

  addCategoria(token: string, categoria){
    this.header.Authorization = "Bearer " + token;
    return this.http.post(`${URL}/api/categorias`, {"nombre": categoria}, {headers: this.header});
  }

  deleteCategoria(token: string, id:number){
    this.header.Authorization = "Bearer " + token;
    return this.http.delete(`${URL}/api/categorias/${id}`, {headers: this.header});
  }

  updateCategoria(token: string, id:number, categoria){
    this.header.Authorization = "Bearer " + token;
    return this.http.put(`${URL}/api/categorias/${id}`, {"nombre": categoria}, {headers: this.header});
  }



}
