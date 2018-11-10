import { Injectable } from '@angular/core';
import{Router} from '@angular/router';
import{HttpClient} from '@angular/common/http';
import{CookieService} from 'ngx-cookie-service';
import {Subject, BehaviorSubject} from 'rxjs';
import { rendererTypeName } from '../../../node_modules/@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  value: boolean;
  $authValidate = new BehaviorSubject<boolean>(this.checkStatus()); ///The dollar symbol is a naming convention for obserbavle
  $authUsername = new Subject<any>();///The dollar symbol is a naming convention for obserbavle
  constructor(private _router:Router, private _http: HttpClient,private _cookieService : CookieService) { }


login(credentials){
  console.log(credentials);
  
  this._http.post('http://localhost:3000/login',credentials)
   .subscribe((resp:any)=>{
     console.log(resp);
     if(resp.flag==true){
      this.$authUsername.next(resp.username); 
      this._cookieService.set('token',resp.token);
      if(this._cookieService.check('token')){
        
        this.$authValidate.next(true); //Broadcasting the value accros the application
      }
      
      this._router.navigate(['/home']);
     }else{
       alert("Wrong Credentialls");
     }
     
     
   });
  }

  checkStatus(){
    if(this._cookieService.check('token')){
return true;
    }

    else{
      return false;
    }
  }
  
  getToken(){
    return this._cookieService.get('token');
    
  }
}
  // //   if(resp.isloggedin){
  //  //   this.$authCheck.next(true);
  //    this._cookieService.set('token',resp.token);
  //     this._router.navigate(['/home']);
  //   }
  //   else{
  //     alert("Wriong Creds!!");
  //   }
// });


