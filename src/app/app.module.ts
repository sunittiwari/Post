import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { HomeComponent } from './home/home/home.component';
import { CreatepostComponent } from './post/createpost/createpost.component';
import { ListPostComponent } from './post/list-post/list-post.component';
import { NavigationComponent } from './navigation/navigation/navigation.component'
import {RouterModule, ActivatedRoute} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { DetailsComponent } from './post/details/details.component';
import { EditPostsComponent } from './edit-posts/edit-posts.component';
import {AuthGuard} from './auth.guard';
import {PostdetailsService} from './post/postdetails.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    CreatepostComponent,
    ListPostComponent,
    NavigationComponent,
    DetailsComponent,
    EditPostsComponent,
   

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"login",component:LoginComponent },
      {path:"home",component:HomeComponent},
      {path:"post",component:ListPostComponent,
      canActivate:[AuthGuard],
      children: [
        { path: 'edit/:id', component: EditPostsComponent }
      ]

      },
      {path:"post/:postTitle",component:ListPostComponent,canActivate:[AuthGuard]},
      {path:"createPost",component:CreatepostComponent,canActivate:[AuthGuard]},
      {path:"registration", component:RegistrationComponent},
      {path:"",redirectTo:"home",pathMatch:"full"},
      {path:"**",redirectTo:"login"}
    ])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
