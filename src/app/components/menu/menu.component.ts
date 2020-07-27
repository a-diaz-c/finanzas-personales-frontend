import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  //@ViewChild('menu') menu: MenuController;

  token: string = '';
  usuario: Usuario = {
    nombre: '',
    apellido: '',
    email: ''
  };

  constructor(private usuarioService: UsuarioService, private storage: Storage,
              private menu: MenuController) { }

  async ngOnInit() {
    await this.cargarToken(); 
    this.usuarioService.getDatosUsuario(this.token).subscribe( (resp: any) => {
      this.usuario = resp.usuario;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  async cargarToken(){
    this.token = await this.storage.get('token');
  }

  logout(){
    this.usuarioService.logout();
  }



}
