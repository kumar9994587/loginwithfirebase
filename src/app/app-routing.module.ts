import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const redirectToLogIn = () => redirectUnauthorizedTo(['login']);
const redirectToPostList = () => redirectLoggedInTo(['post-list']);


const routes: Routes = [
  {
    path:'login',
    pathMatch:'full',
    component:LoginComponent,
    ...canActivate(redirectToPostList)
  },
  {
    path:'sign-up',
    component:SignUpComponent,
    ...canActivate(redirectToPostList)
  },
  {
    path:'post-list',
    component:PostListComponent,
  },
  {path:'home',component:HomeComponent},
  {path:'post-edit',component:PostEditComponent},
  {path:'**',component:LoginComponent}
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
