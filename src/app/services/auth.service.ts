import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFire: AngularFireAuth) { }

  insertUser(user: UserModel) {
    return this.authFire.createUserWithEmailAndPassword(user.correo, user.password);
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
}
