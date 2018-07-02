import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  auth2: any;
  constructor(public router: Router, private _us: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1) {
      this.recuerdame = true;
    }
  }
  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '37081211805-ov9jef3ju8hv4l6idj48kisqd1hcji32.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById("btnGoogle"));
    });
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element,{}, googleUser=>{
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._us.loginGoogle(token)
        .subscribe( () =>{
          // this.router.navigate(['/dashboard']);
          window.location.href = '#/dashboard';
        });
    });
  }
  ingresar(forma: NgForm){
    console.log(forma.value);
    if(forma.invalid){
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._us.login(usuario, forma.value.recuerdame)
      .subscribe(data => {
        this.router.navigate(["/dashboard"]);
      });
    // this.router.navigate(['/dashboard']);
  }

}
