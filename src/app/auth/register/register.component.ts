import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import * as ui from '../../store/actions/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  loading: boolean;
  uiSub: Subscription;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.uiSub.unsubscribe();
  }

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {

    if (this.registroForm.valid) {
      this.store.dispatch(ui.loading({loading:true}));
      this.selectStoreLoading();
      // Swal.fire({
      //   title: 'Espere por favor',
      //   showConfirmButton: false,
      //   didOpen: () => {
      //     Swal.showLoading(Swal.getDenyButton())
      //   }
      // })
      this.authService.insertUser(this.registroForm.value).then(credenciales => {
        console.log(credenciales);
        this.store.dispatch(ui.loading({loading:false}));
        this.selectStoreLoading();
        // Swal.close();
        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(ui.loading({loading:false}));
        this.selectStoreLoading();
        Swal.fire({
          icon:'error',
          title: 'Ooops ...',
          text: err.message
        })
      })
    }

  }

  selectStoreLoading(){
    this.uiSub = this.store.select('ui').subscribe(ui => this.loading = ui.loading);
  }
}
