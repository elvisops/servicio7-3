import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRegistrosComponent } from './buscador-registros.component';

describe('BuscadorRegistrosComponent', () => {
  let component: BuscadorRegistrosComponent;
  let fixture: ComponentFixture<BuscadorRegistrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorRegistrosComponent]
    });
    fixture = TestBed.createComponent(BuscadorRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
