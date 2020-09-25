import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  token: string;
  usuario: Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  constructor(private usuarioService: UsuarioService,
              private storage: Storage,
              public alertController: AlertController,
              private navCtrl: NavController) {}
  async ngOnInit(){
    await this.cargarToken();
    this.cargarUsusario();
  }

  cargarUsusario(){
    this.usuarioService.getDatosUsuario(this.token).subscribe( (resp: any) => {
      this.usuario = resp.usuario;
      console.log(resp.usuario);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  async cargarToken(){
    this.token = await this.storage.get('token');
  }

  categorias(){
    this.navCtrl.navigateRoot('categorias');
  }

  logout(){
    this.usuarioService.logout();
  }

  async refresh(event){
    await this.cargarUsusario();
    event.target.complete();
  }
}
