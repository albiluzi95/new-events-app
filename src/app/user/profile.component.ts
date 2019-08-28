import { Component, OnInit,Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from 'node_modules/@angular/forms';
import { AuthService } from './auth.services';
import { Router } from 'node_modules/@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './profile.component.html',
  styles:[`
  em {float:right; color:#E06C65; padding-left:10px}
  .error input {background-color: #E3C3C5;}
  .error ::-webkit-input-placeholder{color:#999}
  .error ::-moz-placeholder{color:#999}
  .error :-moz-placeholder{color:#999}
  .error :ms-input-placeholder{color:#999}
  `]
})
export class ProfileComponent implements OnInit{
  profileForm:FormGroup

  constructor (private authService:AuthService, private router:Router,
     private toastr: ToastrService){}
      private firstName:FormControl
      private lastName:FormControl
       ngOnInit(){
         this.firstName= new FormControl
         (this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
         this.lastName= new FormControl
         (this.authService.currentUser.lastName, Validators.required)
        this.profileForm= new FormGroup({
            firstName:this.firstName,
            lastName:this.lastName
        })
       }

       cancel(){
          this.router.navigate(['events'])
       }
       saveProfile(formValues){
         if(this.profileForm.valid){
        this.authService.updateCurrentUser(formValues.firstName,formValues.lastName)
        .subscribe(()=>{
          this.toastr.success('Profile Saved')
          })
         }
       }

       logout(){
        this.authService.logout().subscribe(()=>{
          this.router.navigate['/user/login']
        })
       }
       validateLastName(){
        return this.lastName.valid ||this.lastName.untouched
       }
      
       validateFirstName(){
        return this.firstName.valid ||this.firstName.untouched
       }
}