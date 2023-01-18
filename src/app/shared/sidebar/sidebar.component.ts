import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  nombreUser: string = 'User Name';
  userSubs: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
    .pipe(
      filter( ({user}) => user !== null)
    )
    .subscribe(({ user }) => this.nombreUser = user.nombre);
  }

  logout(){
    Swal.fire({
      title: '¿Seguro quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().then(() => this.router.navigate(['../login']));
      }
    })
  }

}
