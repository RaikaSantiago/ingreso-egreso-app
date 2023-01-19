import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form();

  }
  /**
   * Formulario Login
   */
  form() {
    this.loginForm = this.fb.group({
      correo: ['santiagoprueba@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { correo, password } = this.loginForm.value;
      this.authService.loginAuth(correo, password).then(resp => {
        this.loading = false;
        this.router.navigate(['./home/dashboard']);
      }).catch(err => {
        this.loading = false;
        Swal.fire({
          icon:'error',
          title: 'Ooops ...',
          text: err.message
        })
      })
    }
  }

}
