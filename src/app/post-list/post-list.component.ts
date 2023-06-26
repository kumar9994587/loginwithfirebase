import { Component,OnInit } from '@angular/core';
import { Post } from '../post.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  listOfPosts: Post[] = [];

  constructor(private authService:AuthenticationService){}

  ngOnInit(): void {
    this.listOfPosts = this.authService.getPosts();
    this.authService.listChangedEvent.subscribe((listOfPosts:Post[])=> {
      this.listOfPosts = this.authService.getPosts();
    })
  }

}
