import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})



export class AuthGuard implements CanActivate {
  constructor(private router : Router,
    private _authService : AuthService) {}
 loginSubscribe: any;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this._authService.$authValidate.subscribe((resp)=>{
        console.log(resp);  
        if(resp== true){
          console.log(resp);
          this.loginSubscribe=true;
          return this.loginSubscribe;
        }else{
          console.log(resp);
          this.loginSubscribe=false;
          return this.loginSubscribe;
        }
      })
      return true;
     
      
  }
}
