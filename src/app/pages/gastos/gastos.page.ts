import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GastosService } from 'src/app/services/gastos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  token: string;
  categoriaId: number = 0;
  categoriaNombre: string = '';
  gastos: any [] = [];

  constructor(private route: ActivatedRoute, 
              private gastosService: GastosService,
              private storage: Storage,
              private uiUsuarioService: UiServiceService,
              public alertController: AlertController) {
    this.categoriaId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.categoriaNombre= this.route.snapshot.paramMap.get('categoria');
   }

  async ngOnInit() {
    await this.cargarToken();
    this.cargarGastos();
  }

  async cargarToken(){
    this.token = await this.storage.get('token');
  }

  cargarGastos(){
    this.gastosService.getGastos(this.token,this.categoriaId).subscribe( (resp: any)=>{
      this.gastos = [];
      this.gastos.push(...resp.gastos);
      console.log(this.gastos);
    });
  }

  async agregarGasto(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Categoría',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la categoria'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) =>{
            
            if(data.titulo.length === 0){
              return;
            }
            this.gastosService.addGasto(this.token, data.titulo, this.categoriaId).subscribe((resp: any) => {
              console.log(resp);
              this.gastos.push(resp.categoria);
        
            }, (err: HttpErrorResponse) => {
              console.log(err);
              this.uiUsuarioService.alertaInformativa("Error del servidor");
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async modificarGasto(gasto: any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar Categoría',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la categoria',
          value: gasto.nombre
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) =>{
            
            if(data.titulo.length === 0){
              return;
            }
            this.gastosService.updateCategoria(this.token, gasto.idGasto, data.titulo).subscribe((resp: any) => {
              console.log(resp);
              this.cargarGastos();
        
            }, (err: HttpErrorResponse) => {
              console.log(err);
              this.uiUsuarioService.alertaInformativa("Error del servidor");
            });
          }
        }
      ]
    });

    await alert.present();
  }

  borrarGasto(gastos: any){
    
    this.gastosService.delteGasto(this.token,gastos.idGasto).subscribe( (resp: any) => {
      this.gastos = [];
      this.cargarGastos();
    },(err: HttpErrorResponse) => {
      //this.uiUsuarioService.alertaInformativa("Se se pude eliminar porque esta asignado a un día");
      if(err.error.mensaje){
        this.uiUsuarioService.alertaInformativa("Se se pude eliminar porque esta asignado a un día");
        console.log(err.error.respuesta);
      }else{
        this.uiUsuarioService.alertaInformativa("Erro en el servidor");
      }
    });
  }

  async refresh(event){
    await this.cargarGastos();
    event.target.complete();
  }

}
