import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicStorageModule } from '@ionic/storage';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent
  ],
  exports:[
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicStorageModule
  ]
})
export class ComponentsModule { }
