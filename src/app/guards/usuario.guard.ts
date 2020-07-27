import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {
  
  constructor(private usuarioService: UsuarioService){}
  
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.usuarioService.validarToken();
  }

  
}
