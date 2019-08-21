import { Component, OnInit, Output, EventEmitter } from "node_modules/@angular/core";
import {FormControl,FormGroup,Validators} from "@angular/forms"
import { ISession, restrictedWords } from "../shared";
@Component({
    selector:'create-session',
    template:`
    <div class="col-md-12">
        <h3>Create Session</h3>
      </div>
      <div class="col-md-6">
        <form [formGroup]="newSessionForm" (ngSubmit)="SaveSession(newSessionForm.value)" autocomplete="off">
          <div class="form-group">
            <label for="sessionName">Session Name:</label>
            <em *ngIf="name.invalid && name.dirty">Required</em>
            <input formControlName="name" id="sessionName" type="text" class="form-control" placeholder="session name..." />
          </div>
          <div class="form-group">
            <label for="eventDate">Presenter:</label>
            <em *ngIf="presenter.invalid && name.dirty">Required</em>
            <input formControlName="presenter" id="presenter" type="text" class="form-control" placeholder="presenter..." />
          </div>
          <div class="form-group">
            <label for="duration">Duration:</label>
            <em *ngIf="duration.invalid && duration.dirty">Required</em>
            <select formControlName="duration" class="form-control">
              <option value="">select duration...</option>
              <option value="1">Half Hour</option>
              <option value="2">1 Hour</option>
              <option value="3">Half Day</option>
              <option value="4">Full Day</option>
            </select>
          </div>
          <div class="form-group">
            <label for="level">Level:</label>
            <em *ngIf="level.invalid && level.dirty">Required</em>
            <select  formControlName="level" class="form-control">
              <option value="">select level...</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div class="form-group">
            <label for="abstr">abstr:</label>
            <em *ngIf="abstr.invalid && abstr.dirty">Required</em>
            <em *ngIf="abstr.invalid && abstr.dirty">Canot exeed 400 characters</em>
            <em *ngIf="abstr.invalid && abstr.dirty && abstr?.errors.restrictedWords">Restricted Words found: {{abstr.errors.restrictedWords}} </em>
            <textarea formControlName="abstr" id="abstr" rows=3 class="form-control" placeholder="abstr..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
        </form>
      </div> `
})
export class CreateSessionComponent implements OnInit{
    @Output() saveNewSession =new EventEmitter()
    @Output() cancelAddSession= new EventEmitter()
    newSessionForm:FormGroup
    name:FormControl
    presenter:FormControl
    duration:FormControl
    level:FormControl
    abstr:FormControl

    ngOnInit(){
        this.name=new FormControl('',Validators.required)
        this.presenter=new FormControl('',Validators.required)
        this.duration=new FormControl('',Validators.required)
        this.level=new FormControl('',Validators.required)
        this.abstr=new FormControl('',[Validators.required, Validators.maxLength(400),restrictedWords(['foo','bar'])])

        this.newSessionForm=new FormGroup({
            name:this.name,
            presenter:this.presenter,
            duration:this.duration,
            level:this.level,
            abstr:this.abstr

        })
    }
 
  SaveSession(formValues){
   let session:ISession={
       session_id:undefined,
       name:formValues.name,
       duration:formValues.duration,
       level:formValues.level,
       presenter:formValues.presenter,
       abstr:formValues.abstr,
       voters:[]
   }
   this.saveNewSession.emit(session)
  }
  cancel(){
      this.cancelAddSession.emit()
  }
}