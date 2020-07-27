import { Component, OnInit } from '@angular/core';
import { DiasService } from 'src/app/services/dias.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { strict } from 'assert';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  token: string = '';

  dias: Dias[] = [];

  constructor(private diasService: DiasService, 
              private storage: Storage,
              private navCtrl: NavController) {}
  
  async ngOnInit() {
    await this.cargarToken();
    this.cargarDias();
  }

  async cargarToken(){
    this.token = await this.storage.get('token');
  }

  cargarDias(){
    this.diasService.getDias(this.token).subscribe( (resp: any) =>{
      this.dias = [];
      console.log(resp);
      this.dias.push(...resp.dias);
    });
  }

  seleccionarDia(id: number, fecha: string){
    console.log(id);
    this.navCtrl.navigateRoot(`/main/tabs/tab1/detalle-dia/${id}/${fecha}`, {animated: true });
  }

  async refresh(event){
    await this.cargarDias();
    event.target.complete();
  }

  agregarDia(){
    this.navCtrl.navigateRoot(`/agregar-dia/0`, { animated: true });
  }

  

}
