import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeworkPageRoutingModule } from './homework-routing.module';
import { HeaderComponent } from '../share/header/header.component';
import { HomeworkPage } from './homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeworkPageRoutingModule
  ],
  declarations: [HomeworkPage,HeaderComponent]
})
export class HomeworkPageModule {}
