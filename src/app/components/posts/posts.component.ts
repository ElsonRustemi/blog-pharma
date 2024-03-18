import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  postsBe: any[] = [];
  img: any;
  updatePostForm: FormGroup;
  currentPage: number = 1;
  postsPerPage: number = 5;
  deletePostId: number;
  postId: number;

  postTitle: string;
  previewImgPost: string;

  dataFetched: boolean = false;
  confirmDeleteModal: boolean;
  displayUpldateModal: boolean;
  checkTokenForAdmin: boolean;


  items: MenuItem[];
  sub$: Subject<any> = new Subject();
  deletePost$: Subject<any> = new Subject();
  private tokenExpirationSubscription: Subscription;
  previewImageSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private http: HttpClient) {
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

  ngOnInit(): void {

    this.updatePostForm = this.fb.group({
      title: [],
      content: [],
      imagePath: []
    })

    this.getAllPosts();
    this.tokenHasExpired();

    if (localStorage.getItem('act').length) {
      this.checkTokenForAdmin = true;
    }

  }

  goToSinglePost(postId: string) {
    this.router.navigate(['/post', postId]);
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

  tokenHasExpired() {
    this.tokenExpirationSubscription = this.apiService.getTokenRemainingTime().subscribe(
      (remainingTime) => {

        // Update UI or perform actions based on the remaining time
        // console.log(`Token expires in ${remainingTime / 1000} seconds`);

        if (remainingTime <= 0) {
          // Token has expired, perform necessary actions
          console.log('Token has expired');
          this.apiService.logout();
          this.checkTokenForAdmin = false;
        }
      },
      (error) => {
        console.error('Error checking token expiration:', error);
      }
    );
  }

  setFormValue(post) {
    this.postId = post.id;
    this.previewImgPost = post.imagePath
    this.updatePostForm.setValue({
      title: post.title,
      content: post.content,
      imagePath: post.imagePath
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearImagePreview() {
    this.previewImageSrc = null;
    this.selectedFile = null;
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      const blob = new Blob([this.selectedFile], { type: this.selectedFile.type });
      formData.append('file', blob, this.selectedFile.name);

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');

      this.http
        .post('http://localhost:3000/posts/upload-photo', formData, { headers })
        .subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
            this.img = response;
            // Handle the response from the server
          },
          (error) => {
            console.error('File upload failed:', error);
            // Handle the error
          }
        );
    } else {
      console.warn('No file selected');
    }
  }

  updatePost(value: any) {
    const body = {
      title: value.title,
      content: value.content,
      imagePath: this.img.filePath
    }
    this.apiService.updatePost(this.postId, body).subscribe((result) => {
      if (result) {
        this.messageService.add({key: 'updatePost', severity:'success', summary: 'Success', detail: 'Post updated successfully'});
        this.updatePostForm.reset();
        this.displayUpldateModal = false;
        this.getAllPosts();
      }
    });
  }

  deletePost() {
    this.apiService.deletePost(this.deletePostId).pipe(
      takeUntil(this.deletePost$)
    ).subscribe(res => {
      this.getAllPosts();
      this.confirmDeleteModal=false;
      this.messageService.add({key:'bc', severity:'success', summary: 'Success', detail: 'Post deleted successfully'});
    })
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();

    this.deletePost$.next();
    this.deletePost$.complete();
  }

}
