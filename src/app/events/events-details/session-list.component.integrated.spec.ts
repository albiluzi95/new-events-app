import {TestBed,async,ComponentFixture} from '@angular/core/testing'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'
import {SessionListComponent} from './session-list.component'
import {AuthService} from '../../user/auth.services'
import {VoterService} from './voters.service'
import {ISession} from '../shared/event.module'
import {By} from '@angular/platform-browser'
import { UpvoteComponent } from './upvote.component';
import { DurationPipe } from '../shared';
import { CollapsibleWellComponent } from '../../commmon/Index';

describe('SessionListComponent',()=>{
    let fixture:ComponentFixture<SessionListComponent>,
    component:SessionListComponent,
    element:HTMLElement,
    debugEl:DebugElement

    beforeEach(async(()=>{
        let mockAuthService={
            isAuthentificated:()=>true
        };
        let mockVoterService={};
        TestBed.configureTestingModule({
            imports:[],
            declarations:[
                SessionListComponent,
                UpvoteComponent,
                DurationPipe,
                CollapsibleWellComponent
            ],
            providers:[
                {provide:AuthService,useValue:mockAuthService},
                {provide:VoterService,useValue:mockVoterService},
            ],
            schemas:[
                NO_ERRORS_SCHEMA
            ]
        })
    }))
    beforeEach(()=>{
      fixture= TestBed.createComponent(SessionListComponent) 
      component=fixture.componentInstance;
      debugEl=fixture.debugElement;
      element=fixture.nativeElement;
        describe('intital display',()=>{
            component.sessions=[
                {session_id:3,name:'Session1',presenter:'Joe',duration:1,level:'intermediate',abstr:'abstarct',voters:[
                    'john','bob'
                ]}]
                component.filterBy='all';
                component.sortBy='name'
                component.eventId=4;


                component.ngOnChanges();
                fixture.detectChanges();
               //   expect(element.querySelector('[well-title]')
                // .textContent).toContain('Session1');


                expect(debugEl.query(By.css('[well-title]'))
                .nativeElement.textContent).toContain('Session1')
        })
    })
})
