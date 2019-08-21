import { Component, OnInit } from "@angular/core";
import {EventService} from "../shared/event.service";
import { ActivatedRoute, Params } from "@angular/router";
import { IEvent, ISession } from "../shared";

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
    .container{padding-left:20px; padding-right:20px;}
    .event-image {height: 100px}
    a {cursor: pointer}
    `]
})
export class EventDetailsComponent implements OnInit{
    constructor (private eventService: EventService,private route:ActivatedRoute){

    }
    event:IEvent;
    addMode: boolean;
    filterBy: string='all';
    sortBy:string="votes";
    ngOnInit(){
        this.route.params.subscribe((data) =>{
            this.eventService.getEvent(data["id"]).subscribe((myEvent : IEvent) => {
                this.event = myEvent
            })
              this.addMode=false
        })
    }

    addMySession(){
        this.addMode=true
    }

    saveNewSession(session: ISession){
        const nextId= Math.max.apply(null, this.event.sessions.map(s=>s.session_id))
         session.session_id=nextId + 1
         this.event.sessions.push(session)
         this.eventService.saveEvent(this.event)
         this.addMode=false
    }

    cancelAddSession(){
        this.addMode=false
    }
}