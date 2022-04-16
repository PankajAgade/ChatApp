import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Services/app-data.service';
import { ChatRoomDataService } from 'src/app/Services/chat-room-data.service';
import { collection, onSnapshot, getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;

  roomDoc: string = "";
  roomData: any;

  user: any;
  opponentUserData: any;

  mySideMessage: string = "";

  messagesList: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private appDataService: AppDataService, private chatRoomDataService: ChatRoomDataService) { }

  ngOnInit(): void {
    this.roomDoc = this.route.snapshot.params.roomID;
    this.appDataService.getLoginUser().subscribe(_user => {
      if (_user) {
        this.user = _user;
        this.user.placeholder = this.user.name.trim().split("")[0]
        if (this.roomDoc) {
          this.getServerRoom()
        }
      }
    });
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if(this.myScrollContainer){
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
      
    } catch (err) { }
  }

  async getServerRoom() {
    this.chatRoomDataService.getRoomData(this.roomDoc).then(_roomData => {
      this.roomData = _roomData.data()
      if (this.roomData[this.user.uid]) {
        // Get messages
        this.opponentUserData = this.roomData[this.roomData?.userUIDs?.filter((f: string) => f !== this.user.uid)[0]]
        this.opponentUserData.placeholder = this.opponentUserData.name.trim().split("")[0];
        this.getServerMessages(_roomData.ref.path + "/Messages");
      } else {
        this.router.navigateByUrl(`/users`);
      }
    })
  }

  getServerMessages(messageRef: string) {
    // this.chatRoomDataService.getMessageData(messageRef).then(_messagesData => {
    //   this.messagesList = _messagesData.docs.map(m => m.data());
    //   console.log(this.messagesList);
    // })

    onSnapshot(collection(getFirestore(), messageRef), (res) => {
      const _messagesList = res.docs.map(m => ({ time: this.convertDate(m.data().timeStamp), ...m.data() }));

      let sortedData = _messagesList.sort((a: any, b: any) => {
        let bd = this.objToDate(b.timeStamp);
        let ad = this.objToDate(a.timeStamp);
        return ad - bd
      });
      this.messagesList = sortedData;
      // console.log(this.messagesList);
    })
  }

  objToDate(obj: any) {
    let result = new Date(0);
    result.setSeconds(obj.seconds);
    result.setMilliseconds(obj.nanoseconds / 1000000);
    return Number(result);
  }

  convertDate(t: any) {
    const d = new Date(t.toDate());
    return d.toLocaleDateString() + " | " + d.toLocaleTimeString()
  }

  sendMessage() {
    const _postData = {
      message: this.mySideMessage,
      uid: this.user.uid
    }

    this.chatRoomDataService.postMessage(`Rooms/${this.roomDoc}/Messages`, _postData).then(res => {
      this.mySideMessage = "";
    })

  }


}
