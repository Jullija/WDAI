import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PhotosComponent } from './photos/photos.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsServiceService } from './posts-service.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainPageComponent,
    PhotosComponent,
    PostsComponent,
    SinglePhotoComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PostsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
