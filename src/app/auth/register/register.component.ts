import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registroForm: FormGroup;
  loading: boolean = false;

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
      this.loading = true;
      this.authService.insertUser(this.registroForm.value).then(credenciales => {
        this.loading = false;
        this.router.navigate(['/home/dashboard']);
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
