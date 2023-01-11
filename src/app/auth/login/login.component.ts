import { Component, OnInit } from '@angular/core';
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
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Espere por favor',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(Swal.getDenyButton())
        }
      })
      const { correo, password } = this.loginForm.value;
      this.authService.loginAuth(correo, password).then(resp => {
        console.log(resp);
        Swal.close();
        this.router.navigate(['/']);
      }).catch(err => {
        Swal.fire({
          icon:'error',
          title: 'Ooops ...',
          text: err.message
        })
      })
    }
  }

}
