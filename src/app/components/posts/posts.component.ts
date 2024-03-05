import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  postsBe: any[] = [];

  items: MenuItem[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getAllPosts().subscribe((posts) => {
      this.postsBe = posts;
      console.log(this.postsBe);

    });


    this.posts = [
      { header: 'Post 1', content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" },
      { header: 'Post 2', content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" },
      { header: 'Post 3', content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" },
      { header: 'Post 4', content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt       quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" },
      { header: 'Post 5', content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!" },
    ]

    this.items = [
      {
          label: 'Health',
          // icon: 'pi pi-heart',
      },
      {
          label: 'Skin Care',
          // icon: 'pi pi-fw pi-pencil',
      },
      {
          label: 'Fitness',
          // icon: 'pi pi-fw pi-question',
      },
      {
          label: 'Beauty',
          // icon: 'pi pi-fw pi-cog',
      }
  ];
  }

}
