import { Component, OnInit, Input, Output, HostListener, Self, EventEmitter, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import { CommonModule } from "@angular/common"

@Component({
  selector: 'kit-rating',
  templateUrl: './kit-rating.component.html',
  providers:[ NgModel ],
  styleUrls: ['./kit-rating.component.scss']
})
export class KitRatingComponent implements ControlValueAccessor, OnInit {
    @Input() max:number;
    @Input() stateOn:string;
    @Input() stateOff:string;
    @Input() readonly:boolean;
    @Input() titles:Array<string>;
    @Input() ratingStates:Array<{stateOn:string, stateOff:string}>;

    @Output() onHover:EventEmitter<number> = new EventEmitter();
    @Output() onLeave:EventEmitter<number> = new EventEmitter();

    range:Array<any>;
    value:number;
    preValue:number;

    @HostListener('keydown', ['$event'])
    onKeydown(event:KeyboardEvent) {
        if ([37, 38, 39, 40].indexOf(event.which) === -1) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        let sign = event.which === 38 || event.which === 39 ? 1 : -1;
        this.rate(this.value + sign);
    }

    constructor(@Self() public cd:NgModel) {
        cd.valueAccessor = this;
    }

    ngOnInit() {
        this.max = typeof this.max !== 'undefined' ? this.max : 5;
        this.readonly = this.readonly === true;
        this.stateOn = typeof this.stateOn !== 'undefined' ? this.stateOn : 'ion-ios-star';
        this.stateOff = typeof this.stateOff !== 'undefined' ? this.stateOff : 'ion-ios-star-outline';
        this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0 ? this.titles : ['one', 'two', 'three', 'four', 'five'];
        this.range = this.buildTemplateObjects(this.ratingStates, this.max);
    }

    writeValue(value:number) {
        if (value % 1 !== value) {
            this.value = Math.round(value);
            this.preValue = value;
            return;
        }

        this.preValue = value;
        this.value = value;
    }

    buildTemplateObjects(ratingStates:Array<any>, max:number) {
        ratingStates = ratingStates || [];
        let count = ratingStates.length || max;
        let result:any[] = [];
        for (let i = 0; i < count; i++) {
            result.push(Object.assign({
                index: i,
                stateOn: this.stateOn,
                stateOff: this.stateOff,
                title: this.titles[i] || i + 1
            }, ratingStates[i] || {}));
        }
        return result;
    }

    rate(value:number) {
        if (!this.readonly && value >= 0 && value <= this.range.length) {
            this.writeValue(value);
            this.cd.viewToModelUpdate(value);
        }
    }

    enter(value:number) {
        if (!this.readonly) {
            this.value = value;
            this.onHover.emit(value);
        }
    }

    reset() {
        this.value = this.preValue;
        this.onLeave.emit(this.value);
    }

    onChange = (_:any) => {
    };
    onTouched = () => {
    };

    registerOnChange(fn:(_:any) => {}):void {
        this.onChange = fn;
    }

    registerOnTouched(fn:() => {}):void {
        this.onTouched = fn;
    }
}
