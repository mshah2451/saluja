import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportcardPage } from './reportcard.page';

const routes: Routes = [
  {
    path: '',
    component: ReportcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportcardPageRoutingModule {}
