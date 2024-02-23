import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  latestPost: string;
  newsContent: string;
  items: MenuItem[];
  quote: string;
  searchTopic: string;



  constructor() { }

  ngOnInit(): void {

    this.quote = `Wellness is the complete integration of body, mind,
    and spirit – the realization that everything we do, think,
    feel, and believe has an effect on our state of well-being`;

    this.latestPost = `It is a long established fact that a reader will be distracted by the readable content
        of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
        uncover many web sites still in their infancy. Various versions have evolved over the years,
        sometimes by accident, sometimes on purpose (injected humour and the like).`

    this.newsContent = `
        It is a long established fact that a reader will be distracted by the readable content
        of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
        uncover many web sites still in their infancy. Various versions have evolved over the years,
        sometimes by accident, sometimes on purpose (injected humour and the like).
        It is a long established fact that a reader will be distracted by the readable content
        of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
        uncover many web sites still in their infancy. Various versions have evolved over the years,
        sometimes by accident, sometimes on purpose (injected humour and the like).


    `



    this.items = [
      {
        label: 'Home',
        routerLink: ['/home']
      },
      {
        label: 'Posts',
        routerLink: ['/posts']
      },
      {
        label: 'News',
        routerLink: ['/news']
      },
      {
        label: 'Consulting',
        items: [
          {
            label: 'Skin care',
            routerLink: ['/skin-care']
          },
          {
            label: 'Immune System',
            routerLink: ['/immune-system']
          }
        ]
      },
      {
        label: 'About',
        routerLink: ['/about']
      },
    ];


  }

}
