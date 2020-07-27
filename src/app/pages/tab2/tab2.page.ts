import { Component, OnInit, Input } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UiServiceService } from 'src/app/services/ui-service.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  token: string;
  categorias: any[] = [];
  nombreCategoria: string;


  constructor(private categoriasService: CategoriasService, 
              private storage: Storage,
              private router: Router,
              public alertController: AlertController,
              private uiUsuarioService: UiServiceService) {}
  async ngOnInit(){
    await this.cargarToken();
    this.cargarCategorias();
  }

  async cargarToken(){
    this.token = await this.storage.get('token');
  }

  categoriaSeleccionada(id: number, nombre: string){
    this.router.navigateByUrl(`/main/tabs/tab2/gastos/${id}/${nombre}`);
  }

  cargarCategorias(){
    this.categoriasService.getCategorias(this.token).subscribe((resp: any) => {
      this.categorias = [];
      console.log(resp);
      this.categorias.push(...resp.categorias);
    });
  }

  async agregarCategoria(){
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
            this.categoriasService.addCategoria(this.token, data.titulo).subscribe((resp: any) => {
              console.log(resp);
              this.categorias.push(resp.categoria);
        
            }, (err: HttpErrorResponse) => {
              console.log(`Error servidor remoto. ${err.status} # ${err.error.message}`);
              console.log(err.error.error_description);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async modificarCategoria(categoria: any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar Categoría',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la categoria',
          value: categoria.nombre
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
          text: 'Guardar',
          handler: (data) =>{
            
            if(data.titulo.length === 0){
              return;
            }
            this.categoriasService.updateCategoria(this.token, categoria.idCategoria, data.titulo).subscribe((resp: any) => {
              console.log(resp);
              this.cargarCategorias();
            }, (err: HttpErrorResponse) => {
              console.log(`Error servidor remoto. ${err.status} # ${err.error.message}`);
              console.log(err.error.error_description);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  borrarCategoria(categoria: any){
    this.categoriasService.deleteCategoria(this.token, categoria.idCategoria).subscribe(resp  => {
      console.log(resp);
      this.cargarCategorias();
      this.uiUsuarioService.presentToast("Categoria Eliminada");
    }, (err: HttpErrorResponse) => {
      console.log(err);
      if(err.error.mensaje){
        this.uiUsuarioService.alertaInformativa("Hay algún gasto asignado aun día");
        console.log(err.error.respuesta);
      }else{
        this.uiUsuarioService.alertaInformativa("Erro en el servidor");
      }
    });
  }

  async cargarAlertCtrller(titulo: string){
    this.nombreCategoria = '';
    
  }
  
  async refresh(event){
    await this.cargarCategorias();
    event.target.complete();
  }
}
