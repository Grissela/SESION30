import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Users} from '../interface/users'

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  
  constructor(private firestore:Firestore, public router:Router) { }

  getUsers():Observable<Users[]>{
    const refUsers = collection(this.firestore, 'users');
    console.log(refUsers )
    return collectionData(refUsers , {idField:'id'}) as Observable<Users[]>

  }

  addUsers(user:Users[]){
    const refUsers=collection(this.firestore, 'users')
    return addDoc(refUsers, user)
  }
}
