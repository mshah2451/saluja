import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeworkDetails } from '../Homework';

@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.component.html',
  styleUrls: ['./homework-detail.component.scss'],
})
export class HomeworkDetailComponent implements OnInit {
  @Input() homework : HomeworkDetails;
  
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
