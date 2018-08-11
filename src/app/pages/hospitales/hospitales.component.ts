import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalesService } from '../../services/hospitales/hospitales.service';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = true;
  totalRegistros: number;
  desde: number = 0;

  hospitales: Hospital[] = [];
  constructor(
    public _hospital: HospitalesService,
    public _modalS: ModalUploadService
  ) {
    this.getHospitales();
    this._modalS.notificacion.subscribe(resp =>{
      this.getHospitales();
    });
  }

  ngOnInit() {
  }
  getHospitales() {
    this.cargando = true;
    this._hospital.cargarHospitales(this.desde)
    .subscribe((resp: any)=>{
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospital;
      this.cargando = false;
    });
  }
  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.getHospitales();
      return;
    }
    this.cargando = true;
    this._hospital.buscarHospital(termino)
    .subscribe( data =>{
      this.hospitales = data;
      this.cargando = false;
    });
  }
  mostrarModal(id: string) {
    this._modalS.mostrarModal('hospitales', id);
  }
  guardarHospital(hospital: Hospital) {
    this._hospital.actualizarHospital(hospital)
    .subscribe();
  }
  borrarHospital(hospital: Hospital) {
    swal({
      title: "¿Desea borrar el hospital?",
      text: "Está seguro de borrar el hospital" + hospital.nombre,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this._hospital.borrarHospital(hospital._id)
          .subscribe(borrado =>{
            console.log(borrado);
            this.getHospitales();
          });
      }
    });
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.getHospitales();
  }
  crearHospital(){
   
  }
}
