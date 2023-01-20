import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CurrencyI18nDirective } from './directive/currency-i18n.directive';
import { CurrencyMaskDirective } from './directive/currency-mask.directive';
import { OrdenIEPipe } from './pipes/orden-ie.pipe';
import { RouterModule } from '@angular/router';
import { CurrencyCopPipe } from './pipes/currency-cop.pipe';


@NgModule({
  declarations: [
    OrdenIEPipe,
    CurrencyMaskDirective, 
    CurrencyI18nDirective,
    CurrencyCopPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule
  ], 
  exports:[
    FormsModule,
    CurrencyCopPipe,
    ReactiveFormsModule,
    ChartsModule,
    CurrencyMaskDirective,
    OrdenIEPipe,
    CurrencyMaskDirective, 
    CurrencyI18nDirective,
    RouterModule
  ]
})
export class GlobalModule { }
