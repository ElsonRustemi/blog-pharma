import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit, OnDestroy {

  singlePost: any;
  postId: string;

  singlePost$: Subject<any> = new Subject();

  constructor(private apiSevice: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSinglePost();
  }

  getSinglePost() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.apiSevice.getSinglePost(+this.postId).pipe(
      takeUntil(this.singlePost$)
    ).subscribe(singlePostData => {
      this.singlePost = singlePostData;
    });
  }


  ngOnDestroy(): void {
    this.singlePost$.next();
    this.singlePost$.complete();
  }


}
