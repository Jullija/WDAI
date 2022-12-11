import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsServiceService } from '../posts-service.service';

export interface Post{
  userId: string,
  id: string,
  title: string,
  body: string
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})


export class PostsComponent implements OnInit{

  posts: Post[] = []
  modelForm: FormGroup;

  constructor(private postsService: PostsServiceService, private formBuilder: FormBuilder){}
  

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(posts =>{
      this.posts = posts;
    })


    this.modelForm = this.formBuilder.group({
      title:['', Validators.required],
      body:['', Validators.required]
    })
  }


  onSubmit(data: any){
    if (!data.valid){
      alert("Formularz wypełniony niepoprawnie");
      return
    }

    let newPost = {
      userId: "2137",
      id: "420",
      title: data.get("title").value,
      body: data.get("body").value
    }

    this.postsService.givePost(JSON.stringify(newPost)).subscribe(cos=>console.log(cos)); //JSON.stringify konwertuje wartosć na typ JSON
    alert("Post został dodany");
    data.reset();

  }

}
