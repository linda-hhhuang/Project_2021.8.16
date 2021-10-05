import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MemberService } from '@ta/services/member.service';
import { Student } from '@ta/model/member';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-student-personal',
  templateUrl: './student-personal.component.html',
  styleUrls: ['./student-personal.component.css'],
})
export class StudentPersonalComponent implements OnInit {
  isVisibleUpdateInfo = false;
  isOkLoadingUpdateInfo = false;

  currentStudentInfo!: Student;

  constructor(
    private memberSrvc: MemberService,
    private message: NzMessageService
  ) {}

  init() {
    this.memberSrvc.getStudentInfo().subscribe((student) => {
      this.currentStudentInfo = student.body;
    });
  }
  ngOnInit(): void {
    this.init();
  }

  //修改个人信息
  showModalUpdateInfo(): void {
    this.memberSrvc.currentStudent$
      .pipe(filter((v) => v != null))
      .subscribe((v) => {
        this.isVisibleUpdateInfo = true;
        this.currentStudentInfo = v!;
      });
  }
  handleOkUpdateInfo(): void {
    this.isOkLoadingUpdateInfo = true;

    this.memberSrvc
      .updateStudentInfo(this.currentStudentInfo)
      .subscribe((response) => {
        this.message.success(response.msg);
        this.isOkLoadingUpdateInfo = false;
        this.isVisibleUpdateInfo = false;
      });
  }
  handleCancelUpdateInfo(): void {
    this.isVisibleUpdateInfo = false;
  }
}
