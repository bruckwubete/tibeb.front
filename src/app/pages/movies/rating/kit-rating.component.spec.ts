import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitRatingComponent } from './kit-rating.component';

describe('KitRatingComponent', () => {
  let component: KitRatingComponent;
  let fixture: ComponentFixture<KitRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
