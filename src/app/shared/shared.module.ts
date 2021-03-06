
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
  imports: [
    RouterModule,
    PipesModule,
    CommonModule
  ],
  declarations: [
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      ModalUploadComponent
    ],
  exports: [
      HeaderComponent,
       SidebarComponent,
       BreadcrumbsComponent,
       ModalUploadComponent
    ]
})
export class SharedModule {}