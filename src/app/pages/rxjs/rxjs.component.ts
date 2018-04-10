import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  observador: Subscription;
  constructor() {
   this.observador = this.regresaObservable()
    .subscribe(numero => console.log('subs', numero) ,
                  error => console.log('Esto es n error', error),
                ()=> console.log('Se ha terminado'));
   }

  ngOnInit() {
  }
  regresaObservable(): Observable<any>{
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        }
        observer.next(salida); // para notificar al código
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   observer.error('Auxilio!');
        // }
      }, 500);
    }).retry(2)
    .map((resp: any) =>{
      return resp.valor;
    })
    .filter((valor:any, index) =>{
      console.log('filter', valor, index);
      if ((valor % 2) === 1) {
        return true;
      }
      return false;
    });
  }
  ngOnDestroy(): void {
    this.observador.unsubscribe();
  }
}
