import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DiasService {

  header = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " 
  } 

  constructor(private http: HttpClient) {}

  getDias(token: string){
    this.header.Authorization =  "Bearer " + token;
    return this.http.get(`${URL}/api/dias`,{ headers: this.header});
  }

  getGastosDia(token: string, dia: number){
    this.header.Authorization = "Bearer " + token;
    return this.http.get(`${URL}/api/dias/cantidad/${dia}`, { headers: this.header })
  }

  addDias(token: string, datos: any){
    this.header.Authorization = "Bearer " + token;
    return this.http.post(`${URL}/api/dias`, datos, {headers: this.header});
  }

  getSaldoInicial(token: string, fecha: string){
    this.header.Authorization = "Bearer " + token;
    return this.http.get(`${URL}/api/dias/saldoInicial/${fecha}`, {headers: this.header});
  }

  deleteDia(token: string, idDia: number){
    this.header.Authorization = "Bearer " + token;
    return this.http.delete(`${URL}/api/dias/${idDia}`, { headers:  this.header});
  }

  updateDia(token: string, idDia: number, datos:any){
    this.header.Authorization = "Bearer " + token;
    return this.http.put(`${URL}/api/dias/${idDia}`, datos,  { headers:  this.header});
  }

  
}
