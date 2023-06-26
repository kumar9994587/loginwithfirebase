import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export function passwordsMatchValidator(): ValidatorFn {
 return (control: AbstractControl): ValidationErrors | null =>{
  const password = control.get('password')?.value
  const confirmPassword = control.get('confirmPassword')?.value

  if (password && confirmPassword && password !== confirmPassword){
    return {
      passwordsDontMatch:true
    }
  }
  return null;
 }
}


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );
  constructor(
    private authService:AuthenticationService, 
    private router:Router,
    private toast:HotToastService 
  ){}

  ngOnInit(): void {}

  get name(){
    return this.signUpForm.get('name');
  }

  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  submit(){
    const {name, email, password} = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) return;


    this.authService
    .signUp(name, email, password)
    // .pipe(
    //   this.toast.observe({
    //     success:'Congrats! you are all Sign Up',
    //     loading: 'Signing Up',
    //     error: ({ message }) => `${message}`,
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

function subscribe(arg0: () => void) {
  throw new Error('Function not implemented.');
}

