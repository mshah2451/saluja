import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportcardPage } from './reportcard.page';

describe('ReportcardPage', () => {
  let component: ReportcardPage;
  let fixture: ComponentFixture<ReportcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportcardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
