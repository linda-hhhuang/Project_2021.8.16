import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '@core/service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogging = false;

  constructor(private userServ: UserService) {
    this.userServ.isLoading$.subscribe((value) => (this.isLogging = value));
  }

  ngOnInit(): void {
    this.isLogging = false;
  }

  casLogin() {
    window.location.replace(
      // 'https://castest.timzhong.top/#/login?frontend=http://localhost:4200&backend=http://localhost:4200/api/user/cas'
      'http://172.18.198.146:6001/#/login?frontend=http://172.18.198.146:5002&backend=http://172.18.198.146:5002/api/user/cas'
    );
  }
}
