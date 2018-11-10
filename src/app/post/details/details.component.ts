import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import{PostdetailsService} from '../postdetails.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  postId : any;
  detailComment : any ;
  detailCommentSubscriber: any;
  comm : any[];
  showcoments : boolean=false;
  addcoment : any;
  newComent:any;

@Input() id:any; 
 
  constructor(private _activateRoute : ActivatedRoute, private _getcoments :PostdetailsService) { }

  ngOnInit() {
     console.log("Init");
    // this._activateRoute.params.subscribe((resp) => {
    //   this.postId = resp;
    //   });
    //   alert("Details modules")
    //   console.log(this.postId);
    //   this._getcoments.getCommentDetails(this.postId)
    // //  getPostDetails(this.postId);
    //   this._getcoments.$detailComment.subscribe((resp)=>{
    //     this.detailComment = resp;
    //     this.comm = resp.comments;
    //     console.log(this.detailComment);
    //     console.log(this.comm);
        
    //   })
  }
sunit(){
 // console.log(this.id);
  this.detailComment = {
    _id:this.id
  }
  console.log("Sunit");
  this.showcoments=!this.showcoments;
 // console.log(this.detailComment);
  this._getcoments.getCommentDetails(this.detailComment);
  this._getcoments.$detailComment.subscribe((resp)=>{
    this.comm=resp;
   //console.log(this.comm);
  })  
  
}

  addComment(){
    //console.log(this.newComent);
    this.addcoment={
      _id:this.id,
      comment:this.newComent
    }
    console.log(this.addcoment);
    this._getcoments.addComment(this.addcoment).subscribe((resp)=>{
      console.log(resp);
    this._getcoments.getCommentDetails(this.detailComment);
    this._getcoments.$detailComment.subscribe((resp)=>{
    this.comm=resp;
   //console.log(this.comm);
  })  
     // this.sunit();
      
      alert("Comment Added Sucesssfully ");
      this.newComent='';
     // this.ngOnInit();
     // location.reload();
     
      
    })
  }
  trackComment(index,comm){
  return comm; 
  }  


}
