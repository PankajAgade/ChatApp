import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { query, setDoc, getFirestore, collection, getDocs, Timestamp, getDoc, doc, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  private user: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor() { }

  getLoginUser(): Observable<any> {
    if (!this.user.value) {
      const _user = localStorage.getItem('user');
      if (_user) {
        this.user.next(JSON.parse(_user))
      } else {
        this.user.next(null)
      }
    }
    return this.user.asObservable();
  }

  SetLoginUser(_user: any) {
    localStorage.setItem("user", JSON.stringify(_user));
    this.user.next(_user);
  }

  async getUserMessageRoom(opponent: any, _user: any) {
    let roomStr = "";
    if (opponent.uid < _user.uid) {
      roomStr = opponent.uid + _user.uid;
    } else {
      roomStr = _user.uid + opponent.uid;
    }

    const collectionRef = doc(getFirestore(), "Rooms", roomStr)

    return await getDoc(collectionRef)
  }
  async createRoom(opponent: any, _user: any) {
    let roomStr = "";
    if (opponent.uid < _user.uid) {
      roomStr = opponent.uid + _user.uid;
    } else {
      roomStr = _user.uid + opponent.uid;
    }
    const postData = {
      userUIDs: [opponent.uid, _user.uid],
      [opponent.uid]: opponent,
      [_user.uid]: _user,
      createdRoomTimeStamp: Timestamp.now()
    };
    const collectionRef = doc(getFirestore(), "Rooms", roomStr)
    return await setDoc(collectionRef, postData);
  }

  logout(){
    this.user.next(null);
    localStorage.clear();
  }
  async registerUser(email:string,password:string){
    const auth = getAuth();
    return await createUserWithEmailAndPassword(auth,email,password)
  }

  async addUser(postBody:any){
    return await addDoc(collection(getFirestore(),"Users"),postBody);
  }
}

