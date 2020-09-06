import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DiasService } from 'src/app/services/dias.service';
import { GastosService } from 'src/app/services/gastos.service';
import { Storage } from '@ionic/storage';
import { CategoriasService } from 'src/app/services/categorias.service';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-dia',
  templateUrl: './agregar-dia.page.html',
  styleUrls: ['./agregar-dia.page.scss'],
})
export class AgregarDiaPage implements OnInit {

  formulario: FormGroup
  cantidades: any[] = [];
  token: string = '';
  categorias: any[] = [];
  gastos: any[] = [];
  datoJson = {
    "fecha": "",
    "saldoInicial": "",
  }
  gasto: string = '';
  idDia: number;

  constructor(private fb: FormBuilder,
              private diasService: DiasService,
              private gastosService: GastosService,
              private categoriaService: CategoriasService,
              private storage: Storage,
              private route: ActivatedRoute,
              private nacCtrl: NavController) {
    this.crearFormulario();
    this.idDia = parseInt(this.route.snapshot.paramMap.get('nuevo'));
   }

  async ngOnInit() {
    await this.cargarToken();
    if(this.idDia <= 0){
      await this.cargarSaldoInicial(this.fechaActual());
    }
    else{
      await this.cargarDatosFormulario();
    }
    
    this.cargarCategorias();

  }

  crearFormulario(){
    this.formulario = this.fb.group({
      fecha: [this.fechaActual(), Validators.required],
      saldoInicial: ['', Validators.required],
      categoria:['', Validators.required],
      gasto: ['', Validators.required],
      ingreso: [false, Validators.required],
      cantidad: ['', Validators.required]
    });
  }

  addNombreGasto(event){
    let datos;
    datos = this.gastos.find( element => element.idGasto === event.detail.value );
    this.gasto = datos.nombre;
  }

  agregarGasto(){

    if(this.formulario.get('cantidad').value === '' || 
        this.formulario.get('ingreso').value === '' || 
        this.formulario.get('gasto').value === ''){
      return;
    }
    
    const datos = {
      "cantidad": this.formulario.get('cantidad').value,
      "ingreso": this.formulario.get('ingreso').value,
      "gasto":{
        "idGasto": this.formulario.get('gasto').value,
        "nombre": this.gasto,
      } 
    }
    this.cantidades.push(datos);
  }

  borrarGasto(i: number){
    this.cantidades.splice(i,1);
  }

  submit(){
    if(this.formulario.invalid){
      this.formulario.controls['saldoInicial'].markAllAsTouched();
      return;
    }

    this.datoJson.fecha = this.formulario.get('fecha').value;
    this.datoJson.saldoInicial = this.formulario.get('saldoInicial').value;
    this.datoJson['cantidades'] = this.cantidades;

    if(this.idDia == 0){
      this.diasService.addDias(this.token, this.datoJson).subscribe( (resp: any) =>{
        console.log(resp);
        this.nacCtrl.navigateRoot('/main/tabs/tab1');
      });
    }else{
      this.diasService.updateDia(this.token, this.idDia, this.datoJson).subscribe( (resp: any) =>{
        console.log(resp);
        this.nacCtrl.navigateRoot('/main/tabs/tab1');
      });
    }

    
  }

  async cargarToken(){
    this.token = await this.storage.get('token');
  }

  cargarCategorias(){
    this.categoriaService.getCategorias(this.token).subscribe( (resp: any) => {
      this.categorias = resp.categorias;
      console.log(this.categorias);
    });
  }

  cambioCategoria(event){
    if(event.detail.valur === '') return;
    this.gastosService.getGastos(this.token, event.detail.value).subscribe( (resp: any) => {
      console.log(resp.gastos);
      this.gastos = resp.gastos;
    });
  }

  cambioFecha(event){
    
    if(this.idDia != 0) {
      return;
    }

    let fecha: string  = event.detail.value;
    if(fecha === '') return;
    this.cargarSaldoInicial(fecha);
  }

  private cargarSaldoInicial(fecha: string){
    this.diasService.getSaldoInicial(this.token, fecha).subscribe( (resp: any) => {
      console.log(resp);
      if(resp.respuesta){
       this.formulario.controls['saldoInicial'].setValue(resp.usuario.saldoFinal);
       //this.formulario.controls['saldoInicial'].disable();
      }else{
       this.formulario.controls['saldoInicial'].setValue('');
      }
   });
  }

  cargarDatosFormulario(){
    this.diasService.getGastosDia(this.token, this.idDia).subscribe( (resp: any) => {
      console.log(resp);
     if(resp.respuesta){
       this.formulario.controls['fecha'].setValue(resp.dia.fecha);
       this.formulario.controls['saldoInicial'].setValue(resp.dia.saldoInicial);
       this.cantidades = resp.cantidades;
       console.log(this.cantidades);
     }
    });
  }

  private fechaActual (): string{
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();

    var diaSalida = dia.toString();
    var mesSalida = mes.toString(); 
    if(dia<10){
      diaSalida ='0'+ dia; //agrega cero si el menor de 10
    }
    if(mes<10){
      mesSalida ='0'+ mes
    }

    return anio + "-" + mesSalida + "-" + diaSalida;
  }
  

}
