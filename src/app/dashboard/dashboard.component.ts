import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ieActions from '../store/actions/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ieSubs: Subscription;

  constructor(private store: Store<AppState>,
    private ieService: IngresoEgresoService) { }

  ngOnDestroy(): void {

    this.ieSubs?.unsubscribe()
    this.userSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null) // Filtra la data que desea pasar al suscribe
      )
      .subscribe(({ user }) => {
        this.ieSubs = this.ieService.initIngresoEgresoListener(user.uid).subscribe(ieFB => {
          this.store.dispatch(ieActions.setItems({ items: ieFB }))

        })
      })
  }

}
