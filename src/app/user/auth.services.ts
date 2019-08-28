import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import {  of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { tap, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';


const URL = environment.url;
const USER = environment.user;

@Injectable()

export class AuthService{
    currentUser:IUser


    checkAuthenticationStatus(){
     this.http.get('/api/currentIdentity')
        .pipe(tap(data =>{
            if(data instanceof Object){
                this.currentUser=<IUser>data
            }
        }))
    }
    
    constructor(private http:HttpClient){}
    loginUser(userName:string,password:string){
        let options={ headers: new HttpHeaders({'Content-Type':'/application/json'})}
      return  this.http.post(URL + USER+`login?username=${userName}&password=${password}`,options)
        .pipe(tap(data =>{
            this.currentUser=<IUser>data['user']
        })).pipe(catchError(err=>{
            return of(false)
        }))
    }
    isAuthentificated(){
        return !!this.currentUser;
    }

    logout(){
        this.currentUser=undefined;
        let options={ headers: new HttpHeaders({'Content-Type':'/application/json'})};
        return this.http.post('/api/logout',{},options);
    }
    updateCurrentUser(firstName:string,lastName:string){
        this.currentUser.firstName=firstName
        this.currentUser.lastName=lastName

        let options={ headers: new HttpHeaders({'Content-Type':'/application/json'})};
      return  this.http.put(URL + USER +this.currentUser.id,this.currentUser,options)

    }
}