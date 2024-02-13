import { Component, OnInit } from '@angular/core';
import { SlideInterface } from 'src/app/interfaces/slideInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides: SlideInterface[] = [
    { url: '/assets/images/image1.jpg', title: '1'},
    { url: '/assets/images/image2.jpg', title: '2' },
    { url: '/assets/images/image3.jpg', title: '3' },
    { url: '/assets/images/image5.jpg', title: '5' },
    { url: '/assets/images/image6.jpg', title: '6' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
