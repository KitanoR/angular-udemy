import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'ProgressBar', url: '/progress'},
        { titulo: 'Gráficas', url: '/graficas1'},
        { titulo: 'RXjs', url: '/rxjs'},
        { titulo: 'Promesas', url: '/promesas'}
      ]
    }
  ];
  constructor() { }

}
