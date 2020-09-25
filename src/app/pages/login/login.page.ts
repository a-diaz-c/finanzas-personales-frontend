import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  formularioRegistro: FormGroup;
  formularioLogin: FormGroup

  loginUser = {
    username: 'diaz@gmail.com',
    password: '12345'  
  };

  registroUsuario: Usuario = {
    email: '',
    nombre: '',
    apellido: '',
    password: ''
  };

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService, 
              private navCtrl: NavController,
              private uiService: UiServiceService,
              ) { 
                this.crearFormularios();
              }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.slides.lockSwipes(true);
  }

  crearFormularios(){
    this.formularioLogin = this.fb.group({
      email: ['diaz@gmail.com', [Validators.required, Validators.email]],
      password: ['12345', Validators.required]
    });
    this.formularioRegistro = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login( fLogin: NgForm ){

    if(this.formularioLogin.invalid) { return; }

    this.loginUser.username = this.formularioLogin.get('email').value;
    this.loginUser.password = this.formularioLogin.get('password').value

    const valido = await this.usuarioService.login(this.loginUser.username, this.loginUser.password);

    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    }
  }

  

  async registro( fRegistro: NgForm ){

    if(this.formularioRegistro.invalid) { return; }

    this.registroUsuario.email = this.formularioRegistro.get('email').value;
    this.registroUsuario.nombre = this.formularioRegistro.get('nombre').value;
    this.registroUsuario.apellido = this.formularioRegistro.get('apellido').value;
    this.registroUsuario.password = this.formularioRegistro.get('password').value;

    const valido = await this.usuarioService.resgistro( this.registroUsuario );

    if(valido){
      this.uiService.alertaInformativa('Registrado Correctamente');
      this.mostrarLogin();
    }else{
      //this.uiService.alertaInformativa('El email ya se encuentra registrado');
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
