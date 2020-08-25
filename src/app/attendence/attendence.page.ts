import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.page.html',
  styleUrls: ['./attendence.page.scss'],
})
export class AttendencePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  calendar={
    mode:'month',
    currentDate : new Date()
  }

  eventSource=[];

  onCurrentDateChanged(){}
  reloadSource(){}
  onEventSelected(){}
  onViewTitleChanged(){}
  onTimeSelected(){}
}
