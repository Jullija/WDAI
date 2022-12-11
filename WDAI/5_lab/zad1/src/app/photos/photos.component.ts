import { Component, OnInit } from '@angular/core';
import { PostsServiceService } from '../posts-service.service';

export interface Photo{
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit{

  constructor(private photoService: PostsServiceService) { }

  allPhotos: Photo[] = [];


  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(photos =>{
      this.allPhotos = photos;
    })
  } 

}
