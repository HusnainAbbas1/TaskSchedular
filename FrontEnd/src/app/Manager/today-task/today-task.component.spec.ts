import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTaskComponent } from './today-task.component';

describe('TodayTaskComponent', () => {
  let component: TodayTaskComponent;
  let fixture: ComponentFixture<TodayTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
