import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtraBusquedaComponent } from './otra-busqueda.component';

describe('OtraBusquedaComponent', () => {
  let component: OtraBusquedaComponent;
  let fixture: ComponentFixture<OtraBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtraBusquedaComponent]
    });
    fixture = TestBed.createComponent(OtraBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
