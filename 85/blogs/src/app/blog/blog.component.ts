import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from '../shared/blog-service';
import { Subscription } from 'rxjs';
import { Post } from '../shared/post';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  subscription: Subscription;
  posts: Post[];
  postsShowing: Post[];
  postIndex = 0;
  numPostsToShow = 3;

  constructor(private route: ActivatedRoute,
    private blogService: BlogService) { }

  ngOnInit() {
    this.subscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blogService.getPosts(+params.get('blogId')))
    ).subscribe(posts => {
      this.posts = posts;
      this.updatePosts();
    });
  }

  updatePosts() {
    this.postsShowing = [];
    for (let i = this.postIndex; i < this.postIndex + this.numPostsToShow && i < this.posts.length; i++) {
      this.postsShowing.push(this.posts[i]);
    }
  }

  previous() {
    this.postIndex -= this.numPostsToShow;
    this.updatePosts();
  }

  next() {
    this.postIndex += this.numPostsToShow;
    this.updatePosts();
  }

}
