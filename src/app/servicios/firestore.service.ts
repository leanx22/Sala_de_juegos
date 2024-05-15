import { Injectable } from '@angular/core';
import { DocumentReference, DocumentData,Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore){ }

  public async guardar(coleccion: string, data: object): Promise<DocumentReference>
  {
    let col = collection(this.firestore, coleccion);
    return addDoc(col, data);
  }

  public traerDatos(coleccion: string):Observable<(DocumentData | (DocumentData & {}))[]>
  {
    let col = collection(this.firestore, coleccion);
    let observable = collectionData(col);

    return observable;
  }

  public async actualizar(coleccion: string, idDoc: string, data: object): Promise<void>
  {
    let col = collection(this.firestore, coleccion);
    let documento:any = doc(col, idDoc);
    return updateDoc(documento, data);
  }

  public async eliminar(coleccion: string, idDoc: string): Promise<void>
  {
    let col = collection(this.firestore, coleccion);
    let documento:any = doc(col, idDoc);
    return deleteDoc(documento);
  }

}
