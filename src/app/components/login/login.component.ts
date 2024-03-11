import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.userLogin = this.fb.group({
      username: [],
      password: []
    })
  }

  ngOnInit(): void {
  }

  login(value) {
    // console.log(value);
    this.apiService.login(value.username, value.password);

  }



}
