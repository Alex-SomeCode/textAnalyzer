import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Synonym } from './synonym';

describe('Synonym', () => {
  let component: Synonym;
  let fixture: ComponentFixture<Synonym>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Synonym],
    }).compileComponents();

    fixture = TestBed.createComponent(Synonym);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
