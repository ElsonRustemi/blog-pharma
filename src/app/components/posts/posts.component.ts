import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  currentPage: number = 1;
  postsPerPage: number = 5;
  dataFetched: boolean = false;

  items: MenuItem[];
  sub$: Subject<any> = new Subject();
  singlePost$: Subject<any> = new Subject();

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.getAllPosts();

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


  /**
   *
   * @param id
   */
  getSinglePost(id) {

    this.apiService.getSinglePost(id).pipe(
      takeUntil(this.singlePost$)
    ).subscribe(result => {
      this.apiService.setPostBody(result);
      this.router.navigateByUrl('/signlePost');
    })
  }

  /**
   *
   */
  getAllPosts() {
    this.apiService.getAllPosts().pipe(
      takeUntil(this.sub$)
    ).subscribe(res => {
      this.postsBe = res;
      this.dataFetched = true;
    })
  }

  /**
   *
   */
  get paginatedPosts() {
    if (!this.dataFetched) {
      return []; // Return an empty array if data hasn't been fetched yet
    }

    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    return this.postsBe.slice(startIndex, endIndex);
  }

  /**
   *
   * @param page
   */
  goToPage(page: number) {
    this.currentPage = page;
  }

  /**
   *
   * @returns
   */
  getPageArray() {
    if (!this.dataFetched) {
      return []; // Return an empty array if data hasn't been fetched yet
    }

    const pageArray = [];
    const totalPages = Math.ceil(this.postsBe.length / this.postsPerPage);
    for (let i = 0; i < totalPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();

    this.singlePost$.next();
    this.singlePost$.complete();
  }

}
