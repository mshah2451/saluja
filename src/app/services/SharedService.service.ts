import { Injectable ,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

constructor() { }
onMainEvent: EventEmitter<string> = new EventEmitter<string>();

}
