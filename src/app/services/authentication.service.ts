import { Injectable, EventEmitter } from '@angular/core';

import { 
  Auth, 
  authState, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile, 
} from '@angular/fire/auth';

import { from, switchMap } from 'rxjs';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  listChangedEvent: EventEmitter<Post[]> = new EventEmitter();

  currentUser$ = authState(this.auth)

  constructor(private auth:Auth) { }

  login(username:string, password:string){
    return from(signInWithEmailAndPassword(this.auth, username, password))
  }

  signUp(name:string, email:string, password:string){
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe
    (switchMap(({user}) => updateProfile(user, {displayName: name })));
  }

  logout() {
    return from(this.auth.signOut())
  }

  listOfPosts: Post[] = [
    new Post(
      'Nature',
      'Nature is a British weekly scientific journal founded and based in London, England. As a multidisciplinary publication, Nature features peer-reviewed research from a variety of academic disciplines, mainly in science and technology.',
      'https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2019/07/23090714/nature-1024x682.jpeg',
      'satish@test.com',
      new Date(),
      50,2
    ),
    new Post(
      'Hampi',
      'Hampi is an ancient village in the south Indian state of Karnataka. It’s dotted with numerous ruined temple complexes from the Vijayanagara Empire. On the south bank of the River Tungabhadra is the 7th-century Hindu Virupaksha Temple, near the revived Hampi Bazaar. A carved stone chariot stands in front of the huge Vittala Temple site. Southeast of Hampi, Daroji Bear Sanctuary is home to the Indian sloth bear.',
      'https://www.deccanherald.com/sites/dh/files/article_images/2019/03/15/Hampi-DH-1552611002.jpg',
      'satish@test.com',
      new Date(),
      80,2
    ),
    new Post(
      'Araku Valley',
      `Araku Valley is a hill station and valley region in the southeastern Indian state of Andhra Pradesh. It's surrounded by the thick forests of the Eastern Ghats mountain range. The Tribal Museum is dedicated to the area's numerous indigenous tribes, known for their traditional Dhimsa dance, and showcases traditional handicrafts.`,
      'https://vizagtourism.org.in/images/places-to-visit/header/araku-valley-vizag-tourism-entry-fee-timings-holidays-reviews-header.jpg',
      'satish@test.com',
      new Date(),
      120,3
    ),
    new Post(
      'Nature',
      'Nature is a British weekly scientific journal founded and based in London, Englan. Nature features peer-reviewed research from a variety of academic disciplines, mainly in science and technology.',
      'https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2019/07/23090714/nature-1024x682.jpeg',
      'satish@test.com',
      new Date(),
      52,2
    ),
  ];

  // facility 1
  getPosts() {
    return this.listOfPosts;
  }

  // facilty 2
  deletePost(index: number) {
    this.listOfPosts.splice(index, 1);
  }

  // Facility 3
  addPost(post: Post) {
    this.listOfPosts.push(post);
  }

  // facility 4
  updatePost({ index, post }: { index: number; post: Post; }) {
    this.listOfPosts[index] = post;
  }

  // facility 5
  getPost(index: number) {
    return this.listOfPosts[index];
  }

  // facility 6
  likePost(index: number) {
    this.listOfPosts[index].numberOfLikes += 1;
  }

  UnlikePost(index: number) {
    this.listOfPosts[index].numberOfUnlikes += 1;
  }

  // facility 7
  setPosts(listOfPosts: Post[]) {
    this.listOfPosts = listOfPosts;
    this.listChangedEvent.emit(listOfPosts);
  }

}

