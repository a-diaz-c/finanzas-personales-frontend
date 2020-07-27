import { Component, OnInit } from '@angular/core';
import { DiasService } from 'src/app/services/dias.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-dia',
  templateUrl: './detalle-dia.page.html',
  styleUrls: ['./detalle-dia.page.scss'],
})
export class DetalleDiaPage implements OnInit {

  token: string = '';
  idDia: number;
  fecha: string;
  gastos: any[] = [];
  dia = {
    'saldoInicial': '',
    'saldoFinal': ''
  }

  constructor(private diaService: DiasService, 
              private storage: Storage,
              private route: ActivatedRoute,
              public actionSheetCrtl: ActionSheetController,
              private navCtrl: NavController) {
      this.idDia = parseInt(this.route.snapshot.paramMap.get('id'));
      this.fecha = this.route.snapshot.paramMap.get('fecha');
  }

  async ngOnInit() {
    await this.cargarToken();
    this.cargarDetallesDia();
  }

  async cargarToken(){
    this.token = await this.storage.get('token');
  }

  cargarDetallesDia(){
    this.diaService.getGastosDia(this.token, this.idDia).subscribe( (resp: any) => {
      console.log(resp);
      this.gastos = resp.cantidades
      this.dia = resp.dia;
    });
  }

  async lanzarMenu(){

    const actionSheet = await this.actionSheetCrtl.create({
      buttons: [
        {
          text: 'Agregar Movimiento',
          icon: 'add-circle-outline',
        },
        {
          text: 'Modificar',
          icon: 'create-outline',
          handler: () => {
            this.navCtrl.navigateRoot(`/agregar-dia/${this.idDia}`, {animated: true});
          }
        },
        {
          text: 'Eliminar',
          icon: 'close-circle-outline',
          cssClass: 'action-dark',
          handler: () => {
          }
        }, 
        {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


}
