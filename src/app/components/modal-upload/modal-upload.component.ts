import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;
  constructor(
    public _carga: SubirArchivoService,
    public _modalS: ModalUploadService
  ) {}

  ngOnInit() {}
  seleccionarImage(archivo: any) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      swal(
        "Sólo imágenes",
        "El archivo seleccionado no es una imagen",
        "error"
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }
  subirImagen(){
    this._carga.subirArchivo(this.imagenSubir, this._modalS.tipo, this._modalS.id)
    .then(resp=>{
      console.log(resp);
      this._modalS.notificacion.emit(resp);
      this.cerrarModal();
    })
    .catch(err =>{
      console.log('Error en la carga');
    });
  }
  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir =  null;
    this._modalS.ocultarModal();
  }
}
