import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  cargando: boolean = true;
  constructor(public _us: UsuarioService, public _modalS: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalS.notificacion.subscribe(resp =>{
      this.cargarUsuarios();
    });
  }
  cargarUsuarios() {
    this.cargando = true;
    this._us.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
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
    this.cargarUsuarios();
  }
  buscarUsuario(termino: string) {
    console.log(termino);
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._us.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._us.usuario._id) {
      swal("No puede borrar usuario", "No se puede borrar a si mismo", "error");
      return;
    }
    swal({
      title: "¿Desea borrar usuario?",
      text: "Está seguro de borrar al usuario " + usuario.nombre,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this._us.borrarUsuario(usuario._id).subscribe(borrado => {
          this.cargarUsuarios();
          console.log(borrado);
        });
      }
    });
  }
  guardarUsuario(usuario: Usuario) {
    this._us.actualizarUsuario(usuario).subscribe();
  }
  mostrarModal(id: string){
    this._modalS.mostrarModal('usuarios', id);
  }
}
