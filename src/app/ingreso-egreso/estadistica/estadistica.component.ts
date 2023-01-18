import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  
  ingresos: number = 0;
  egresos: number = 0;
  total_Ingresos: number = 0;
  total_Egresos: number = 0;
  diferencia: number = 0;

  public doughnutChartLabels: Label[] = ['Ingreso', 'Egreso'];
  public doughnutChartData: MultiDataSet = [
    []
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe( ({ items }) => this.generarEstadistica(items))
  }

  generarEstadistica(items: IngresoEgreso[]){
    this.limpiar();
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.total_Ingresos += item.monto;
        this.ingresos ++;
      }else{
        this.total_Egresos += item.monto;
        this.egresos ++;
      }
    }
    this.doughnutChartData = [ [this.total_Ingresos, this.total_Egresos]] 
  }

  diferenciaIE(){
    return this.total_Ingresos - this.total_Egresos;
  }

  limpiar(){
    this.total_Egresos = 0;
    this.total_Ingresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
  }

}
