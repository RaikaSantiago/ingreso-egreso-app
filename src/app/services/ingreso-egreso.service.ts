import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  public uidUser: string = this.authService.usuario.uid;

  constructor(private fireStore: AngularFirestore,
    private authService: AuthService) { 
      
    }

  insIngresoEgreso(ingEgr: IngresoEgreso) {
    
    const { uid, ...ingEgre} = ingEgr; // Quitamos el uid con el estado undefined

    return this.fireStore.doc(`${this.uidUser}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingEgre });
  }

  initIngresoEgresoListener(uid: string) {
    return this.fireStore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({ uid: doc.payload.doc.id, ...doc.payload.doc.data() as any })))
      )
  }

  deleteItem(uid: string){
    return this.fireStore.doc(`${this.uidUser}/ingresos-egresos/items/${uid}`).delete();
  }
}
