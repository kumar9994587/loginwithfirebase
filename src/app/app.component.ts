import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
// import { BackEndService } from './backend.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'liginFirebase';

  constructor(
    public authService:AuthenticationService,
    private router:Router,
    // private backEndService :BackEndService
    ){}

  ngOnInit(): void {
    
  }

    logout(){
      this.authService.logout().subscribe(()=>{
        this.router.navigate(['/login'])
      })
    }
    addpost(){
      this.router.navigate(['/post-edit'])
    }
    // onSave() {
    //   console.log('onSave() Called!');
    //   this.backEndService.saveData();
    // }
    // onFetch() {
    //   console.log('onFetch() called!');
    //   this.backEndService.fetchData();
    // }
    
}
