import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from '../models/auth.models';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.models';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFire: AngularFireAuth,
              private firestore: AngularFirestore) { }

  initAuthListener(){
    this.authFire.authState.subscribe( fUser => {
      console.log(fUser);  
    })
  }

  /**
   * Función para crear usuario
   * @param user Objto con los datos
   * @returns Retorna una promesa con la respuesta
   */
  insertUser(usuario: UserModel) {
    return this.authFire.createUserWithEmailAndPassword(usuario.correo, usuario.password).then(({user}) => {
      const newUser = new UsuarioModel( user.uid, usuario.nombre, user.email);
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
  logout(){
    return this.authFire.signOut();
  }
  /**
   * Valida si el usuario esta autenticado
   * @returns Retorna un observable buleano
   */
  isAuth(){
    return this.authFire.authState.pipe(
      map( fbUser => fbUser != null)
    )
  }
}
