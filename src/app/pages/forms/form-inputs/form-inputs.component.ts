import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';

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
  
  ngOnInit() {
    this.movie.posters = new Array<File>()
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
}
