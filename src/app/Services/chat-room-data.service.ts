import { Injectable } from '@angular/core';
import { query, orderBy , getFirestore, collection, getDocs, Timestamp, getDoc, doc, addDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChatRoomDataService {

  constructor() { }

  async getRoomData(RoomID:string) {
    const collectionRef = doc(getFirestore(), "Rooms",RoomID)
    return await getDoc(collectionRef)
  }

  
  async getMessageData(messageID:string) {
    const collectionRef = collection(getFirestore(), messageID)
    // return await getDocs(collectionRef)
   return query(collectionRef , orderBy("timeStamp",'desc'))
    //  collectionRef;
  }

  async postMessage(messageID:string,postData:any) {
    postData.timeStamp = Timestamp.now();
    const collectionRef = collection(getFirestore(), messageID)
    return await addDoc(collectionRef,postData);
  }

}
