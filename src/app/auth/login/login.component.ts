import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import * as ui from '../../store/actions/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean;
  uiSub: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnDestroy(): void {
    this.uiSub.unsubscribe();
  }

  ngOnInit(): void {
    this.form();
    this.selectStoreLoading();
  }
  /**
   * Formulario Login
   */
  form() {
    this.loginForm = this.fb.group({
      correo: ['santiagorivera@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {
    if (this.loginForm.valid) {
      this.store.dispatch(ui.loading({loading:true}));
      this.selectStoreLoading();
      // Swal.fire({
      //   title: 'Espere por favor',
      //   showConfirmButton: false,
      //   didOpen: () => {
      //     Swal.showLoading(Swal.getDenyButton())
      //   }
      // })
      const { correo, password } = this.loginForm.value;
      this.authService.loginAuth(correo, password).then(resp => {
        console.log(resp);
        this.store.dispatch(ui.loading({loading:false}));
        this.selectStoreLoading();
        console.log(this.loading);
        
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
