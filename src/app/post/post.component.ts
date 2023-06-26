import { Component,OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post?: Post;
  @Input() index: number = 0;

  memberName = 'Sam';

  constructor(private authService: AuthenticationService, private router: Router){}

  ngOnInit(): void {
    console.log(this.post);
    console.log(this.index);
  }

  onDelete() {
    console.log('onDelete() called!');
    this.authService.deletePost(this.index);
  }

  onEdit() {
    console.log('onEdit() called!');
    this.router.navigate(['/post-edit', this.index]);
  }

  likePost() {
    this.authService.likePost(this.index);
  }

  UnlikePost() {
    this.authService.UnlikePost(this.index);
  }

}
