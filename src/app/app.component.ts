import { Component, OnInit } from '@angular/core';
import { SlideInterface } from './interfaces/slideInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  slides: SlideInterface[] = [
    { url: '/assets/images/image1.jpg', title: '1'},
    { url: '/assets/images/image2.jpg', title: '2' },
    { url: '/assets/images/image3.jpg', title: '3' },
    { url: '/assets/images/image5.jpg', title: '5' },
    { url: '/assets/images/image6.jpg', title: '6' }
  ]

  constructor() { }

  ngOnInit() { }

}
