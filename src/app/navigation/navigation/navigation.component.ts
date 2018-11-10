import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../auth/auth.service';
import {PostdetailsService} from '../../post/postdetails.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
 isloggedIn : boolean ;
 
 
 constructor( private _authService: AuthService, private _postDetails: PostdetailsService) { }

  ngOnInit() {
    this._authService.$authValidate.subscribe((data)=>{
      console.log(data);
      
      this.isloggedIn=data;
      console.log(this.isloggedIn);
      
    });
  }
  getpostlist(){
  this._postDetails.getpostlist();
  }
}
