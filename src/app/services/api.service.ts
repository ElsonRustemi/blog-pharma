import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string = "";
  private jtwToken$ = new BehaviorSubject<string>(this.token);
  private API_URL = 'http://localhost:3000';

  private singlePost = new BehaviorSubject("");
  getSinglePostObject = this.singlePost.asObservable();

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
    const fetchedToken: string = localStorage.getItem("act");

    if (fetchedToken) {
      this.token = fetchedToken;
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
   *
   * @param id
   * @returns
   */
  getSinglePost(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/posts/${id}`)
  }

  setPostBody(singlePost: any) {
    this.singlePost.next(singlePost);
  }

  /**
   * Logs user in create post
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    this.http.post(`${this.API_URL}/auth/login`, { username, password })
      .subscribe((res: { token: string }) => {
        this.token = res.token;

        if (this.token) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
        }

        this.jtwToken$.next(this.token);
        localStorage.setItem("act", this.token);
        this.router.navigateByUrl('/create-posts');
      }, (err: HttpErrorResponse) => console.log(err.message));
  }

  /**
   * Logs user out of create post
   * @returns
   */
  logout() {
    this.token = "";
    this.jtwToken$.next(this.token);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout was successful' });
    localStorage.removeItem("act");
    this.router.navigateByUrl("/home").then();
    return "";
  }

  checkTokenOfUser() {
    const token = localStorage.getItem('act');
    const decoded = jwtDecode(token);
    return decoded['exp']
  }

  getTokenRemainingTime(): Observable<number> {
    const token = localStorage.getItem('act');
    const decoded = jwtDecode<{ exp: number }>(token);
    const expirationTime = decoded.exp * 1000; // Convert from seconds to milliseconds
    const now = new Date().getTime();
    const remainingTime = expirationTime - now;

    return interval(1000).pipe(
      map(() => {
        const currentTime = new Date().getTime();
        return expirationTime - currentTime;
      })
    );
  }

  /**
   * Create post method
   * @param formData
   * @returns
   */
  createPost(formData: any) {
    return this.http.post(`${this.API_URL}/posts`, formData);
  }

  updatePost(id: number, body: any) {
    return this.http.put(`${this.API_URL}/posts/${id}`, body);
  }

  getImageUrl() {
    return `${this.API_URL}/posts/upload-photo`; // Update the URL based on your backend
  }

  deletePost(id: number) {
    return this.http.delete(`${this.API_URL}/posts/${id}`);
  }

}
