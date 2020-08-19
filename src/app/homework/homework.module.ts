import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeworkPageRoutingModule } from './homework-routing.module';
// import { HeaderComponent } from '../share/header/header.component';
import { HomeworkPage } from './homework.page';
import { ShareableModule } from '../share/shareable/shareable.module';
import { UploadHomeworkComponent } from './upload-homework/upload-homework.component';
import { HomeworkDetailComponent } from './homework-detail/homework-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeworkPageRoutingModule,
    ShareableModule
  ],
  declarations: [HomeworkPage,UploadHomeworkComponent,HomeworkDetailComponent],
  entryComponents: [UploadHomeworkComponent,HomeworkDetailComponent]
})
export class HomeworkPageModule {}
