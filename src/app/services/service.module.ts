import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  MedicoService,
  HospitalesService,
  VerficaTokenGuard,
  SubirArchivoService
} from "./service.index";
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { AdminGuard } from './guards/admin.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    MedicoService,
    LoginGuardGuard,
    HospitalesService,
    SubirArchivoService,
    ModalUploadService,
    AdminGuard,
    VerficaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
