import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup;
  img: any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private http: HttpClient, private messageService: MessageService) {
    this.postForm = this.fb.group({
      title: [],
      content: [],
      image: []
    })
  }

  ngOnInit(): void {
  }

  onBasicUploadAuto(event) {
    console.log(event);
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
          console.log(this.img);

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

    const body = {
      title: value.title,
      content: value.content,
      imagePath: this.img.filePath
    }

    this.apiService.createPost(body).subscribe((result) => {
      if (result) {
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Success', detail: 'Post created successfully'});
        this.postForm.reset();
      }
      console.log(result);
    });
  }

}
