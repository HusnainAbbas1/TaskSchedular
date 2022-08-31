import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSideBarComponent } from './manager-side-bar.component';

describe('ManagerSideBarComponent', () => {
  let component: ManagerSideBarComponent;
  let fixture: ComponentFixture<ManagerSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
