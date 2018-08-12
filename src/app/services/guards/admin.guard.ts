import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../service.index';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _usuario: UsuarioService) { };
  canActivate() {
    if (this._usuario.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this._usuario.logout();
      return false;
    }
  }
}
