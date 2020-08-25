import { NgModule, CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendencePageRoutingModule } from './attendence-routing.module';

import { AttendencePage } from './attendence.page';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendencePageRoutingModule,
    NgCalendarModule
  ],
  declarations: [AttendencePage], 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AttendencePageModule {}
