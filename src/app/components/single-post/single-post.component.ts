import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  singlePost: any;

  constructor(private apiSevice: ApiService) { }

  ngOnInit(): void {

    this.getSinglePost()

  }

  getSinglePost() {
    return this.apiSevice.getSinglePostObject.subscribe( singlePost => {
      this.singlePost = singlePost
    })
  }


}
