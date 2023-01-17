import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.models';
import { AppState } from '../../app.reducer';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ieArr: IngresoEgreso[] = [];
  itemSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ieService: IngresoEgresoService) { }

  ngOnDestroy(): void {
    this.itemSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.itemSubs = this.store.select('ingresoEgreso').subscribe(({ items }) => this.ieArr = items)
  }

  borrar(uid: string){
    this.ieService.deleteItem(uid).then(res => {
      console.log(res);
      
    })
  }

}
