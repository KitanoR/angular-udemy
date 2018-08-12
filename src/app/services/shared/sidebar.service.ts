import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard'},
  //       { titulo: 'ProgressBar', url: '/progress'},
  //       { titulo: 'Gráficas', url: '/graficas1'},
  //       { titulo: 'RXjs', url: '/rxjs'},
  //       { titulo: 'Promesas', url: '/promesas'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: '/usuarios'},
  //       {titulo: 'Hospitales', url: '/hospitales'},
  //       {titulo: 'Médicos', url: '/medicos'},
  //     ]
  //   }
  // ];
  menu: any[] = [];
  constructor(public _usaurio: UsuarioService) {
    
  }
  cargarMenu(){
    this.menu = this._usaurio.menu;
  }

}
