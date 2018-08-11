import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert2';

@Injectable()
export class HospitalesService {
  token: string = '';
  constructor(public http: HttpClient) { 
    this.cargarToken();
  }
  cargarToken(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  }
  cargarHospitales(desde: number = 0){
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }
  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.get(url);
  }
  borrarHospital(id: string){
    let url = URL_SERVICIOS + "/hospital/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url)
    .map(resp =>{
      swal('Hospital borrado', 'Se ha eliminado el hospital correctamente', 'success');
      return true;
    });
  }
  crearHopistal(nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    return this.http.post(url, {nombre});
  }
  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.hospitales);
  }
  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    return this.http.put(url, hospital)
      .map((resp: any) => {
        swal("Hospital actualizado", hospital.nombre, "success");
        return true;
      });
  }
}
