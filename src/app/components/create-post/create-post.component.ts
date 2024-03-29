import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup;
  img: any;
  private tokenExpirationSubscription: Subscription;

  categories: Category[];
  selectedCategory: Category;

  constructor(private fb: FormBuilder, private apiService: ApiService, private http: HttpClient, private messageService: MessageService) {
    this.postForm = this.fb.group({
      title: [],
      content: [],
      image: []
    })

    this.categories = [
      { name: 'Health', code: 'HE' },
      { name: 'Skin Care', code: 'SC' },
      { name: 'Fitness', code: 'FI' },
      { name: 'Beauty', code: 'BE' }
    ];
  }

  ngOnInit(): void {

    this.tokenHasExpired();

  }

  onBasicUploadAuto(event) {
    if (event && event.currentFiles && event.currentFiles.length > 0) {
      const file = event.currentFiles[0]; // Get the first file from currentFiles array
      const objectURL = file.objectURL?.changingThisBreaksApplicationSecurity; // Extract the objectURL
      // const objectURL = file.name;
      if (objectURL) {
        this.postForm.get('image').setValue(objectURL); // Set the image control value with the objectURL
      }
    }
  }

  /**
   *
   * @param file
   */
  uploadFile(file: File) {

    const formData = new FormData();

    const blob = new Blob([file], { type: file.type });
    formData.append('file', blob, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post('http://localhost:3000/posts/upload-photo', formData, { headers })
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

  }


  /**
   *
   * @param value
   */
  onSubmitPost(value) {

    let categoryName = this.selectedCategory.name

    const body = {
      title: value.title,
      content: value.content,
      category: categoryName,
      imagePath: this.img.filePath
    }
    console.log(body);

    this.apiService.createPost(body).subscribe((result) => {
      if (result) {
        this.messageService.add({key: 'postCreated', severity:'success', summary: 'Success', detail: 'Post created successfully'});
        this.postForm.reset();
      }
    });
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
        }
      },
      (error) => {
        console.error('Error checking token expiration:', error);
      }
    );
  }

}
