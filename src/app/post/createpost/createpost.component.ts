import { Component, OnInit } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import{Router} from '@angular/router';
import{AuthService} from '../../auth/auth.service';
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  authform :any ={};
  userName: any;
  data : any = {};
  
  constructor(private _http:HttpClient, private _router : Router,private _user:AuthService) { }

  ngOnInit() {
    this._user.$authUsername.subscribe((resp) => {
      this.userName= resp.username;
      alert(this.userName);
      console.log(this.userName);
    });
  
  }
  pushPost(){
    var token = this._user.getToken();
    console.log(this.userName+"This is inside postfunction");
    this._http.post('http://localhost:3000/createpost',this.authform,{
      headers:new HttpHeaders().set('authtoken', token)
    }).subscribe((resp:any)=>{
     if(resp.flag ==true){
      alert("Succesfully Posted");
      this._router.navigate(['/post']);
     }else{
       alert("Ooops Something went wrong");
     }
      
      console.log(resp);

    });
  }
}
