import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string = "";
  private jtwToken$ = new BehaviorSubject<string>(this.token);
  private API_URL = 'http://localhost:3000'

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
      const fetchedToken: string = localStorage.getItem("act");

      if(fetchedToken) {
        this.token = atob(fetchedToken);
        this.jtwToken$.next(this.token);
      }

    }

  /**
   *
   */
  get jwtUserToken(): Observable<string> {
    return this.jtwToken$.asObservable();
  }

  /**
   * Returns all posts
   */
  getAllPosts(): Observable<any> {
    return this.http.get(`${this.API_URL}/posts`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  /**
   * Logs user in create post
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    this.http.post(`${this.API_URL}/auth/login`, { username, password })
    .subscribe((res: {token: string}) => {
      this.token = res.token;

      if (this.token) {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Login successful'});
      }
      this.jtwToken$.next(this.token);
      localStorage.setItem("act", btoa(this.token));
      this.router.navigateByUrl('/create-posts').then();
    }, (err: HttpErrorResponse) => console.log(err.message));
  }

  /**
   * Logs user out of create post
   * @returns
   */
  logout() {
    this.token = "";
    this.jtwToken$.next(this.token);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Logout was successful'});
    localStorage.removeItem("act");
    this.router.navigateByUrl("/login").then();
    return "";
  }

  /**
   * Create post method
   * @param title
   * @param content
   * @param imagePath
   * @returns
   */
  createPost(title: string, content: string, imagePath: string) {
    return this.http.post(`${this.API_URL}/posts`,
      { title, content, imagePath },
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    )
  }

  // /**
  //  * Deletes post
  //  * @param postId
  //  */
  // deletePost(postId: number) {
  //   this.http.delete(`${this.API_URL}/posts/${postId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${this.token}`
  //       }
  //     }).pipe(
  //       tap((res) => {
  //         if (res) {
  //           this.messageService.add({severity:'success', summary: 'Success', detail: 'Post deleted successfully'});
  //         }
  //       })
  //     )
  // }


}