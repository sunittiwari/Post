import { Component, OnInit,Input } from '@angular/core';
import {PostdetailsService} from '../post/postdetails.service';
import { RouterModule, Routes ,Router} from '@angular/router';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.css']
})
export class EditPostsComponent implements OnInit {
  authForm :any = {};
  EditPostBlock : boolean = false;
  editPostdetails: any;
  @Input() id:any; 
  @Input() postTitle:any; 
  @Input() postDetail:any; 
  constructor(private _editPostService : PostdetailsService, private _router:Router) {}

  ngOnInit() {
    
  }



  updatePost(){
    this.editPostdetails={
      _id:this.id,
      postTitle:this.authForm.postTitle,
      postDescription:this.authForm.postDescription
    }
    console.log(this.editPostdetails);
    this._editPostService.updatePost(this.editPostdetails);
    //this._router.navigate(['/post']);
  }

  showHideEditPost(){
   // alert("Hello");
    this.EditPostBlock= !this.EditPostBlock;
    
  }
  Sunit()
  {
    //alert("sunit");
    this.EditPostBlock= !this.EditPostBlock;
    console.log(this.EditPostBlock);
    console.log(this.id);
    console.log(this.postDetail);
    console.log(this.postTitle);
    this.authForm.postTitle=this.postTitle;
    this.authForm.postDescription=this.postDetail;
  }
}
