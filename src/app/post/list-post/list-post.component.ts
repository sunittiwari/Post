import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {PostdetailsService} from '../postdetails.service';



@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
  providers :[PostdetailsService]
})
export class ListPostComponent implements OnInit {
  pageTitle: string='List of All Posts';
  listposts : any =[];
  likeId : any ;
  listpostsSubscription : any;
  likessubscribe: any=[];
  showDetails : boolean = false;
  likedBy:any;
  wholikesubscribe:any;
  wholike:any=[];
  EditPostBlock:boolean= false;
  deleteId : any ;
 
  
  constructor(private _http : HttpClient,private _listpost: PostdetailsService) { }
 
  ngOnInit() {
  //  alert("initialize");
    
    // this.listpostsSubscription=this._listpost.getpostlist().subscribe((resp:any)=>{
    //   this.listposts = resp.data; 
      
    //   console.log(this.listposts);
    // // console.log(this.listposts.userName);
    //   });    
   // console.log(this.listposts);



   this._listpost.getpostlist();

   this._listpost.$list.subscribe((resp:any)=>{
    // console.log('Inside list init')
     console.log(resp);
     this.listposts=resp;
   })

  }

  // LikeBy(i){
  //   this.likedBy={
  //     _id:i
  //   } 
  //   this._listpost.onwholike(this.likedBy);
  //   this.wholikesubscribe=this._listpost.onwholike(this.likedBy).subscribe((resp:any)=>{
  //    console.log(resp);
  //     this.wholike = resp.succes1.likedBy[i]; 
  //     console.log(this.wholike);
  //   }); 
    // this._listpost.$likes.subscribe((resp)=>{
    //  this.likessubscribe=resp;
    //   console.log(this.likessubscribe);
    //   this.ngOnInit();
    // })
 
    trackPosts(index,listposts){
    //  alert("track is called");
    
      return listposts;
    //  console.log(listposts);
    }
  getpostlist(){
    alert("getpostlist");
   console.log(this.listposts);
   
  }
  ondetails(){
    alert("Hello Details");
    this.showDetails = !this.showDetails;
    console.log(this.showDetails);
  }

  onLike(i){
    console.log(i);
    this.likeId = {
      _id:i
    }
   this._listpost.onLike(this.likeId);

    this._listpost.$likes.subscribe((resp)=>{
     this.likessubscribe=resp;
      console.log(this.likessubscribe);
      this.ngOnInit();
    })
  }
  onwholike(id){
    console.log("Sunit");
    console.log(id);
      this.likedBy={
        _id:id
      } 
      this._listpost.onwholike(this.likedBy);
      this.wholikesubscribe=this._listpost.onwholike(this.likedBy).subscribe((resp:any)=>{
       console.log(resp);
        this.wholike = resp.succes1.likedBy; 
        console.log(this.wholike);
       // this.showwholike!=this.showwholike;
      }); 
   
  }
  showHideEditPost(){
    alert("Hello");
    this.EditPostBlock= !this.EditPostBlock;
  }
  onDelete(id){
    console.log(id);
    this.deleteId={
      _id:id
    }
    this._listpost.onDelete(this.deleteId);
    this._listpost.onDelete(this.deleteId).subscribe((resp:any)=>{
      console.log(resp);
        if(resp.flag== true){
          this.ngOnInit();
        }else{
          alert("Cannot delete Sorry !!!");
        }
    })
  }
  // ngOnChanges(){
  //  console.log(this.listposts) ;
  // }
  
}
