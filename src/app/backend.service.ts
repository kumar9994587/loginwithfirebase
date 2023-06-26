import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from './services/authentication.service';

/**
 * Database Path
 * https://livepost-13b06-default-rtdb.firebaseio.com

/
 */

@Injectable({ providedIn: 'root' })
export class BackEndService {
  constructor(private authService: AuthenticationService, private http: HttpClient) {}

  // Fun 1 - Save
  saveData() {
    // Step 1 - get list of posts from post.service
    const listOfPosts: Post[] = this.authService.getPosts();
    // Step 2 - send list of posts to backend
    this.http
      .put(
        'https://angular-signup-6b440-default-rtdb.firebaseio.com/posts.json',
        listOfPosts
      )
      .subscribe((res) => {
        console.log(res);
      },(error)=>{
        alert('Something went wrong')
      });
  }

  // Fun 2 - Fetch
  // fetchData() {
  //   // Step 1
  //   this.http
  //     .get<Post[]>(
  //       'https://angular-signup-6b440-default-rtdb.firebaseio.com/posts.json'
  //     )
  //     .pipe(
  //       tap((listOfPosts: Post[]) => {
  //         console.log(listOfPosts);
  //         // Step 2 - Send to post.service
  //         this.postService.setPosts(listOfPosts);
  //       })
  //     )
  //     .subscribe();
  // }
}
