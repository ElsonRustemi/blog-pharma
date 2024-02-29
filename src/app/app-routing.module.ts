import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostsComponent } from './components/posts/posts.component';
import { NewsComponent } from './components/news/news.component';
import { SkinCareComponent } from './components/skin-care/skin-care.component';
import { ImmuneSystemComponent } from './components/immune-system/immune-system.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'skin-care', component: SkinCareComponent },
  { path: 'immune-system', component: ImmuneSystemComponent },
  { path: 'about', component: AboutComponent },
  { path: 'create-posts', component: CreatePostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
