import { Component, OnInit } from '@angular/core';
import { NotificationsService, Command } from '../notifications.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  messages: Observable<Command[]>

  constructor(private notificationsService: NotificationsService) {
    this.messages = this.notificationsService.messagesOutput

    setInterval(()=> {this.notificationsService.addSuccess('NOTWorking')}, 2000)
   }

  ngOnInit(): void {
  }
  onClick(id){
    this.notificationsService.clearMessage(id)
  }
}
