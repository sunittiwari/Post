import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService} from '../auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostdetailsService {
  $detailComment = new Subject<any>();///The dollar symbol is a naming convention for obserbavle
  $likes = new Subject<any>();//The dollar symbol is a naming convention for obserbavle
  $list = new Subject<any>();//The dollar symbol is a naming convention for obserbavle

  
  constructor(private _http: HttpClient,private _auth :AuthService, private _route:ActivatedRoute) { }

    getpostlist(){
      //alert("Service is working");
      var token = this._auth.getToken();
    console.log(token);
    return  this._http.get('http://localhost:3000/getpost',{
        headers:new HttpHeaders().set('authtoken', token)
        
      }).subscribe((resp:any)=>{
        console.log(resp);
        this.$list.next(resp.data);
        
        // this.$list=resp.data;
        // console.log(this.$list);
      })
      //console.log(headers);
    }

    getCommentDetails(id){
     console.log("commentService");
     console.log(id);
      var token = this._auth.getToken();
      return this._http.post('http://localhost:3000/getcomments',id,{
        headers:new HttpHeaders().set('authtoken', token)
      }).subscribe((resp:any)=>{
       console.log(resp.data.comments);
        this.$detailComment.next(resp.data.comments);
      })
    }

    onLike(likeId){
     console.log(likeId);
     var token = this._auth.getToken(); 
     return this._http.post('http://localhost:3000/likes',likeId,{
      headers:new HttpHeaders().set('authtoken', token) 
     }).subscribe((resp)=>{
       console.log(resp);
       this.$likes.next(resp);
     })
    
      
    }
    onwholike(id){
      console.log(id);
      var token = this._auth.getToken(); 
      return this._http.post('http://localhost:3000/whoLike',id,{
        headers:new HttpHeaders().set('authtoken', token) 
      })
    }

    addComment(inputId){
      console.log(inputId);
      var token = this._auth.getToken();
      return this._http.post('http://localhost:3000/addComment',inputId,{
        headers:new HttpHeaders().set('authtoken', token) 
      })
    }
    updatePost(id){
      alert("From Service");
      console.log(id);
      var token = this._auth.getToken();
      return this._http.post('http://localhost:3000/updatePost',id,{
        headers:new HttpHeaders().set('authtoken', token) 
      }).subscribe((resp:any)=>{
        console.log(resp);
        if(resp.flag === true){
         // location.reload();
         this.getpostlist();
         
        }else{
          alert("Sorry Something went wrong");
        }
      })
      
    }
    onDelete(id){
      console.log(id);
      var token = this._auth.getToken();
      return this._http.post('http://localhost:3000/onDelete',id,{
        headers:new HttpHeaders().set('authtoken', token)
      })
      // .subscribe((resp:any)=>{
      //   console.log(resp);
      //   if(resp.flag== true){
      //    location.reload();
      //   }else{
      //     alert("Cannot delete Sorry !!!");
      //   }
      // })
    }
}
