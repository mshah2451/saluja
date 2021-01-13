import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportcardPageRoutingModule } from './reportcard-routing.module';

import { ReportcardPage } from './reportcard.page';
import { ShareableModule } from '../share/shareable/shareable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareableModule,
    ReportcardPageRoutingModule
  ],
  declarations: [ReportcardPage]
})
export class ReportcardPageModule {}
