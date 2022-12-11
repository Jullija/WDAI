import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhotosComponent } from './photos/photos.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';

const routes: Routes = [
  {path: "photos", component: PhotosComponent},
  {path: "posts", component: PostsComponent},
  {path: "photos/:id", component: SinglePhotoComponent},
  {path: "", component: MainPageComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
