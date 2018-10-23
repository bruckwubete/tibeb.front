import { Component, Input } from '@angular/core';

@Component({
  selector: 'etmdb-backdrop',
  styleUrls: ['./backdrop.component.scss'],
  templateUrl: './backdrop.component.html',
})
export class Backdrop {
    @Input() path: String;
}