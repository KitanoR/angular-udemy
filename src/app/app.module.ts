
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




// rutas
import { APP_ROUTES } from './app.routes';


// Módulos
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
     APP_ROUTES,
     PagesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
