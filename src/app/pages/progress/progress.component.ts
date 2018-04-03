import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styles: []
})
export class ProgressComponent implements OnInit {
  progreso: number = 50;
  progreso2: number = 20;
  constructor() {}

  ngOnInit() {}
  actualizar(evento: number) {
    console.log('Evento: ', evento);
    this.progreso = evento;
  }
}
