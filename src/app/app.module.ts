import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// Componentes
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";

// rutas
import { APP_ROUTES } from "./app.routes";

// Módulos
import { PagesModule } from "./pages/pages.module";
// temporal
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Servicios
import { ServiceModule } from "./services/service.module";
import { PagesComponent } from "./pages/pages.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
