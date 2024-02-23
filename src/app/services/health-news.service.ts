import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthNewsService {

  apiBody: string = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=";
  apiKey: string = environment.key

  constructor(private http: HttpClient ) { }

  getHeathNews(): Observable<any> {
    return this.http.get(this.apiBody + this.apiKey);
  }
}
