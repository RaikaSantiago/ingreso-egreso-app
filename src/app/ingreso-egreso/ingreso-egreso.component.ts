import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit {

  ingEgrForm: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService) { 
      
    }

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.ingEgrForm = this.fb.group({
      uid: [''],
      monto: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  submit() {

    if (this.ingEgrForm.valid) {
      this.loading = true;

      const { descripcion, monto } = this.ingEgrForm.value;

      const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

      this.ingresoEgresoService.insIngresoEgreso(ingresoEgreso).then(res => {
        this.loading = false;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${this.tipo.toUpperCase()} registrado con exito.`,
          showConfirmButton: false,
          timer: 2500
        })
        setTimeout(() => {
          this.ingEgrForm.reset();
        }, 2500);
      }).catch(err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Se presento un error al registrar el ${this.tipo.toUpperCase()}, Error: ${err}.`,
          showConfirmButton: false,
          timer: 3500
        })
        this.loading = false;
      })
    }

  }

}
