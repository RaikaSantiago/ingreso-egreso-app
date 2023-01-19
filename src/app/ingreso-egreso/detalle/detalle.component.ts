import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.models';
import { AppStateWithIE } from 'src/app/store/reducers/ingreso-egreso.reducer';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ieArr: IngresoEgreso[] = [];
  itemSubs: Subscription;

  constructor(private store: Store<AppStateWithIE>,
              private ieService: IngresoEgresoService) { }

  ngOnDestroy(): void {
    this.itemSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.itemSubs = this.store.select('ingresoEgreso').subscribe(({ items }) => this.ieArr = items)
  }

  borrar(uid: string){
    this.ieService.deleteItem(uid).then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
    .catch( err => Swal.fire('Error', err.message, 'error'));
  }

}
