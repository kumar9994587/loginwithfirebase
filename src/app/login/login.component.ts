import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', Validators.required)
  })

  constructor(
    private authService:AuthenticationService, 
    private router:Router,
    private toast:HotToastService,
   
    ){}

  ngOnInit(): void {}

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  submit(){
    const {email, password} = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password){
      return;
    }

    if(email == '') {
      alert('Please enter email');
      return;
    }

    if(password == '') {
      alert('Please enter password');
      return;
    }

    this.authService.login(email,password)
    // .pipe(
    //   this.toast.observe({
    //     success:'Logged in successfully',
    //     loading:'Logging in...',
    //     error:'These was an error',
    //   })
    // )
    .subscribe(()=>{
      this.router.navigate(['/post-list'])
    },(error)=>{
      console.log("Error",error);
      alert('Enter valid Inputs')
    }) 
  }

}
