import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from '../models/auth.models';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as auth from '../store/actions/user.actions';
import { Subscription } from 'rxjs';
import { unSetItems } from '../store/actions/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubs: Subscription;
  _usuario: UsuarioModel;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private authFire: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.authFire.authState.subscribe(fUser => {

      if (fUser) {
        this.userSubs = this.firestore.doc(`${fUser.uid}/usuario`).valueChanges().subscribe(({ uid, nombre, email }) => {
          this._usuario = new UsuarioModel(uid, nombre, email);
          this.store.dispatch(auth.setUser({ user: this._usuario }));
          this.store.dispatch(unSetItems());
        })
      } else {
        this._usuario = null;
        this.userSubs?.unsubscribe();
        this.store.dispatch(auth.unSetUser());
      }
    })
  }

  /**
   * Función para crear usuario
   * @param user Objto con los datos
   * @returns Retorna una promesa con la respuesta
   */
  insertUser(usuario: UserModel) {
    return this.authFire.createUserWithEmailAndPassword(usuario.correo, usuario.password).then(({ user }) => {
      const newUser = new UsuarioModel(user.uid, usuario.nombre, user.email);
      return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
    })
  }
  /**
   * Función de logueo
   * @param correo Correo para el inicio de sesión
   * @param password Contraseña para el inicio de sesión
   * @returns Retona una promesa con los datos necesarios del logueo
   */
  loginAuth(correo: string, password: string) {
    return this.authFire.signInWithEmailAndPassword(correo, password);
  }
  /**
   * Función de cerrar sesión
   */
  logout() {
    return this.authFire.signOut();
  }
  /**
   * Valida si el usuario esta autenticado
   * @returns Retorna un observable buleano
   */
  isAuth() {
    return this.authFire.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }
}
