import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './photos/photos.component';
import { Post } from './posts/posts.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  constructor(private page: HttpClient) { }

  getPhotos(): Observable<Photo[]>{
    return this.page.get<Photo[]>("http://jsonplaceholder.typicode.com/photos");
  }

  getPosts(): Observable<Post[]>{
    return this.page.get<Post[]>("http://jsonplaceholder.typicode.com/posts");
  }

  getPhotoURL(id: number): Observable<Photo>{
    return this.page.get<Photo>("http://jsonplaceholder.typicode.com/photos/" + id.toString());
  }

  givePost(post: string): Observable<any>{
    return this.page.post<any>("https://jsonplaceholder.typicode.com/posts", post, httpOptions); //do http:.. dodaję posta, korzystając z httpOptions
  }



}
