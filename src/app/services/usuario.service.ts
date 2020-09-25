import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   token: string = null;

  constructor( private http: HttpClient, 
               private storage: Storage,
               private navCtrl: NavController,
               private uiService: UiServiceService) { }

  login(username: string, password: string){

    this.uiService.presentLoading("Cargando...");
    
    const data = {username, password, grant_type: 'password'};

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', password);

    return new Promise( resolve => {
      this.http.post(`${URL}/oauth/token`, params.toString(), {headers: httpHeaders}).subscribe((resp: any) => {
        this.guardarToken(resp.access_token);
        resolve(true);
        this.uiService.detenerLoading();
      },(err: HttpErrorResponse) => {
        this.storage.clear();
        if(err.error.error == 'unauthorized'){
          this.uiService.alertaInformativa("Datos incorrectos");  
        }else{
          this.uiService.alertaInformativa("Error en el servidor");
        }
        resolve(false);
        this.uiService.detenerLoading();
      });
    });

  }

  resgistro(usuario: Usuario){
      return new Promise( resolve =>{
        this.http.post(`${URL}/api/usuarios`, usuario).subscribe((resp: any) => {
          if(resp.respuesta){
            resolve(true);
          }else{
            resolve(false);
            this.uiService.alertaInformativa(resp.mensaje);
          }
        }, (err: HttpErrorResponse) => {
          this.uiService.alertaInformativa("Error en el servidor");
        });
      });
  }

  async guardarToken(token: string){
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validarToken(): Promise<boolean>{

    await this.cargarToken();

    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.token
      }

      this.http.get(`${URL}/api/usuarios`, {headers: headers}).subscribe( resp => {
        
        if(resp['respuesta']){
          console.log(resp);
          resolve(true);
        }else{
          this.navCtrl.navigateRoot('/login');
          console.log(resp);
          resolve(false);
        }
      }, (err: HttpErrorResponse) => {
        this.storage.clear();
        console.log(err);
        this.navCtrl.navigateRoot('/login');
        resolve(false);
      });

    });
  }

  getDatosUsuario(token: string){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
    return this.http.get(`${URL}/api/usuarios`, {headers: headers})
  }

  logout(){
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

}
