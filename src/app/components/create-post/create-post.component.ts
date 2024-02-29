import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      if (objectURL) {
        this.postForm.get('image').setValue(objectURL); // Set the image control value with the objectURL
      }
    }
  }

  onSubmitPost(value) {
    console.log(value);

  }

}
