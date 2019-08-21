import {Component } from '@angular/core'
import { AuthService } from '../user/auth.services';
import { ISession } from '../events/shared/event.module';
import {EventService} from '../events/index';

@Component ({
    selector: 'nav-bar',
    templateUrl:'./navbar.component.html',
    styles:[`
    .nav.navbar-nav {font-size:15px;}
    #searchForm {margin-right:100 px;}
    @media (max-width:1200px){
        #searchForm{ display:none}
    }
    li > a.active {color: #F97924;}
    `]
})

export class NavBarComponent{
    searchTerm:string="";
    foundSession: ISession[];
    constructor(public auth:AuthService,private eventService: EventService){}

    SearchSessions(searchTerm: string){
        this.eventService.searchSessions(searchTerm).subscribe(sessions =>{
            this.foundSession=sessions;
        })
    }
}
