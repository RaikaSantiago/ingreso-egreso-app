import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  nombreUser: string = 'User Name'
  userSub: Subscription;

  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(
      filter( ({user}) => user !== null)
    )
    .subscribe(({ user }) => this.nombreUser = user.nombre);
  }

}
