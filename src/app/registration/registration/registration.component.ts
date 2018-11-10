import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  auth :any = {};
  
  constructor(private _http:HttpClient ) { }

  ngOnInit() {
  }
  register(){
    var userRegistration = this.auth;
    console.log(userRegistration);
    this._http.post('http://localhost:3000/registration',userRegistration)
    .subscribe((resp:any)=>{
      console.log(resp)
    });
  }
}
