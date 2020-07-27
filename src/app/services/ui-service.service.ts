import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  private loading: any;

  constructor(private alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message,
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      cssClass: 'toast',
      duration: 2000
    });
    toast.present();
  }

  detenerLoading(){
    this.loading.dismiss();
  }
  
}
