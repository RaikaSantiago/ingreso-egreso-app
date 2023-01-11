import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

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
      Swal.fire({
        title: 'Espere por favor',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(Swal.getDenyButton())
        }
      })
      this.authService.insertUser(this.registroForm.value).then(credenciales => {
        console.log(credenciales);
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
