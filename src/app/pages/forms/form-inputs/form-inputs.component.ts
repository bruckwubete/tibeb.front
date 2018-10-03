import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { UserService } from '../../../@core/data/users.service';
import * as _ from "lodash";
import { User } from '../../../@auth/models/user';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent implements OnInit {

  starRate = 2;
  heartRate = 4;
  actor: any = {};
  movie: any = {};
  submitted: boolean = false;
  showCreateActor: boolean = true;
  fileName: String;
  profilePicFileName: String
  contacts = []
  recent = []
  
 constructor(private userService: UserService){}
  
  ngOnInit() {
    this.movie.posters = new Array<File>();
    this.movie.actors = new Array<User>();
    this.movie.newActors = new Array<User>();
    this.actor.socialLinks = {};
    this.actor.profilePics = new Array<File>();
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

  actorProfilePicUpload(fileInput: any) {
    Array.from(fileInput.target.files).forEach(file => this.actor.profilePics.push(file))
    this.profilePicFileName = fileInput.target.files[0].name
  }
  
  addActor(event, actor) {
    const actorIndex = _.findIndex(this.movie.actors, function(a) {
      return a['user'].name === actor.user.name
    })
    if (actorIndex === -1) {
      actor.element = event.path[0]
      this.movie.actors = _.union(this.movie.actors, [actor]);
    } else {
      this.movie.actors.splice(actorIndex, 1)
    }
    event.path[0].classList.toggle('tcon-transform')
  }

  removeActor(event, actor) {
    this.movie.actors = _.filter(this.movie.actors, function(a) {
      return a['user'].name !== actor.user.name
    })
    actor.element.classList.toggle('tcon-transform')
    event.path[0].classList.toggle('tcon-transform')
  }

  removeCreatedActor(event, actor) {
    this.movie.newActors = _.filter(this.movie.newActors, function(a) {
      return a.fullName !== actor.fullName
    })
    this.showCreateActor = this.movie.newActors.length === 0;
  }

  submitActor(){    
    this.actor.profilePics.forEach((a) => {
      const reader = new FileReader();
      reader.onload = function(event) {
        a.path = event.target;
      };
      reader.readAsDataURL(a);
    });
    this.actor.fullName = this.actor.firstName + ' ' + this.actor.lastName;
    this.movie.newActors.push(this.actor)
    this.showCreateActor = false;
    this.actor = {}
  }

  submitMovie(){
    this.movie.actors = this.movie.actors.concat(this.movie.newActors)
    console.log(this.movie)
  }
}
