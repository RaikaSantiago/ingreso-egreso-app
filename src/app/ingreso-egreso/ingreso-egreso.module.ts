import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from '../store/reducers/ingreso-egreso.reducer';
import { GlobalModule } from '../global.module';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';



@NgModule({
  declarations: [
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
