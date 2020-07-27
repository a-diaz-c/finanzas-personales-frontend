import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  loginUser = {
    username: 'diaz@gmail.com',
    password: '12345'  
  };

  registroUsuario: Usuario = {
    email: 'diaz@gmail.com',
    nombre: 'Alberto',
    apellido: 'Diaz',
    password: '123456'
  };

  constructor(private usuarioService: UsuarioService, 
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.slides.lockSwipes(true);
  }

  async login( fLogin: NgForm ){

    if(fLogin.invalid) { return; }

    const valido = await this.usuarioService.login(this.loginUser.username, this.loginUser.password);

    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    }else{
      //this.uiService.alertaInformativa('Email o Contraseña no son correctos');
    }
  }

  

  async registro( fRegistro: NgForm ){

    if(fRegistro.invalid) { return; }

    const valido = await this.usuarioService.resgistro( this.registroUsuario );

    if(valido){
      this.uiService.alertaInformativa('Registrado Correctamente');
      this.mostrarLogin();
    }else{
      this.uiService.alertaInformativa('El email ya se encuentra registrado');
    }
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
