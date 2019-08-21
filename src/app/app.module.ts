import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {EventsListsComponent,
    EventListResolver,
    CreateEventComponent,
    EventDetailsComponent,
    EventsThumbnailComponent,
    EventService,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator
} from './events/index'
import {EventsAppComponent} from './events-app.component';
import {NavBarComponent} from './nav/navbar.component'
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import {
    JQ_TOKEN,
    Toastr,
    TOASTR_TOKEN,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective
} 
from './commmon/Index'
// import { EventRouteActivator } from './events/events-details/event-router-activator.service';
import { AuthService } from './user/auth.services';
import { FormsModule, ReactiveFormsModule } from 'node_modules/@angular/forms';
import  {HttpClientModule} from '@angular/common/http';
import { EventResolver } from './events/event-resolver.service';

let toastr: Toastr= window['toastr'];
let jQuery=window['$']

@NgModule ({
    declarations: [
    EventsAppComponent,
    EventsListsComponent,
    EventsThumbnailComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SimpleModalComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    UpvoteComponent,
    ModalTriggerDirective,
    LocationValidator,
    EventDetailsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule
    ],
    providers:[EventService,
        {provide: TOASTR_TOKEN,useValue:toastr},
        {provide: JQ_TOKEN,useValue:jQuery},
        EventListResolver,
        AuthService,
        EventResolver,
        VoterService,
        {provide:'CanDeactivateCreateEvent',useValue: checkDirtyState},
    ],
    bootstrap:[EventsAppComponent],
})
export class AppModule {}
export function checkDirtyState(component:CreateEventComponent){
    if(component.isDirty)
    return window.confirm('You have not saved the changes,do you really want to cancel')
    return true
}