import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent implements OnInit {

  starRate = 2;
  heartRate = 4;
  movie: any = {};
  submitted: boolean = false;
  fileName: String;
  contacts = []
  recent = []
  
 constructor(private userService: UserService){}
  
  ngOnInit() {
    this.movie.posters = new Array<File>();
    this.userService.getUsers()
      .subscribe((users: any) => {
        this.contacts = [
          {user: users.nick, type: 'mobile'},
          {user: users.eva, type: 'home'},
          {user: users.jack, type: 'mobile'},
          {user: users.lee, type: 'mobile'},
          {user: users.alan, type: 'home'},
          {user: users.kate, type: 'work'},
        ];

        this.recent = [
          {user: users.alan, type: 'home', time: '9:12 pm'},
          {user: users.eva, type: 'home', time: '7:45 pm'},
          {user: users.nick, type: 'mobile', time: '5:29 pm'},
          {user: users.lee, type: 'mobile', time: '11:24 am'},
          {user: users.jack, type: 'mobile', time: '10:45 am'},
          {user: users.kate, type: 'work', time: '9:42 am'},
          {user: users.kate, type: 'work', time: '9:31 am'},
          {user: users.jack, type: 'mobile', time: '8:01 am'},
        ];
      });
  }
  
  public myDatePickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
  };
 public model: any = { date: { year: 2018, month: 10, day: 9 } };
 fileChangeEvent(fileInput: any) {
    Array.from(fileInput.target.files).forEach(file => this.movie.posters.push(file))
    this.fileName = fileInput.target.files[0].name
  }
  
  transform(event, item){
    event.path[0].classList.toggle('tcon-transform'
  }
}
