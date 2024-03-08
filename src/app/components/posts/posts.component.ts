import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: any[] = [];
  postsBe: any[] = [];

  items: MenuItem[];
  sub$: Subject<any> = new Subject();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getAllPosts().pipe(
      takeUntil(this.sub$)
    ).subscribe(res => this.postsBe = res);

    // this.apiService.getAllPosts().subscribe((posts) => {
    //   this.postsBe = posts;
    //   console.log(this.postsBe);
    // });


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

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }

}
