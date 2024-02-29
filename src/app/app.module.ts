import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBlog, faMortarPestle, faRunning } from '@fortawesome/free-solid-svg-icons';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {PanelMenuModule} from 'primeng/panelmenu';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';


import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { HeaderComponent } from './components/header/header.component';
import { PostsComponent } from './components/posts/posts.component';
import { SkinCareComponent } from './components/skin-care/skin-care.component';
import { ImmuneSystemComponent } from './components/immune-system/immune-system.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { LatestPostsComponent } from './components/latest-posts/latest-posts.component';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CreatePostComponent } from './components/create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageSliderComponent,
    HeaderComponent,
    PostsComponent,
    SkinCareComponent,
    ImmuneSystemComponent,
    AboutComponent,
    FooterComponent,
    LatestPostsComponent,
    HomeComponent,
    NewsComponent,
    TruncatePipe,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AppRoutingModule,
    MenubarModule,
    GalleriaModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    CardModule,
    DividerModule,
    PanelMenuModule,
    InputTextareaModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faMortarPestle,
      faBlog,
      faRunning
    );
  }
}
