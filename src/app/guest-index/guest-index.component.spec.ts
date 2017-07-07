/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GuestIndexComponent } from './guest-index.component';

describe('GuestIndexComponent', () => {
  let component: GuestIndexComponent;
  let fixture: ComponentFixture<GuestIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuestIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
