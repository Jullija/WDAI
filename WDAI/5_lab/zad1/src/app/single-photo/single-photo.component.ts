import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsServiceService } from '../posts-service.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent implements OnInit{  
  id: number = -1;
  photoUrl: string = "";

  constructor(private route: ActivatedRoute, private singlePhotoService: PostsServiceService){}


  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.id = params['id'];
    })

    this.singlePhotoService.getPhotoURL(this.id).subscribe(photo =>{
      this.photoUrl = photo.url;
    })
  }

}
