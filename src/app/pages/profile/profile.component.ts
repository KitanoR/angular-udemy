import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _us: UsuarioService) {
    
  }
  ngOnInit() {
    this.usuario = this._us.usuario;
    console.log(this.usuario);
  }
  guardar(usuario: Usuario){
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this._us.actualizarUsuario(this.usuario)
    .subscribe( resp=>{
      console.log(resp);
    });
  }
  seleccionarImage(archivo: any){
    if(!archivo) {
      this.imagenSubir = null;
      return;
    }
    if(archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
    console.log(archivo);
  }
  cambiarImagen(){
    this._us.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
