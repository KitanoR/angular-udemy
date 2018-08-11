import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  cargando: boolean = true;
  totalRegistros: number;
  desde: number = 0;

  medicos: Medico[] = [];
  constructor(public _medico:  MedicoService) { 
    this.getMedicos();
  }

  ngOnInit() {
  }
  getMedicos(){
    this._medico.cargarMedicos()
    .subscribe( data =>{
      this.medicos = data;
    });
  }
  buscarMedico(termino: string){
    if(termino.length <= 0){
      this.getMedicos();
      return;
    }
    this._medico.buscarMedicos(termino)
    .subscribe( medicos => this.medicos = medicos);
  }
  crearMedico(){

  }
  mostrarModal(){

  }
  guardarMedico(medico: Medico){

  }
  borrarMedico(medico: Medico){
    this._medico.borrarMedico(medico._id)
    .subscribe(()=>{
      this.getMedicos();
    });
  }
  cambiarDesde(valor: number){

  }

}
