import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ShareableModule } from '../share/shareable/shareable.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareableModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage],
 
})
export class DashboardPageModule {}
