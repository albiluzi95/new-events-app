import { Component, Input, OnChanges } from '../../../../node_modules/@angular/core';
import { ISession } from '../shared';
import { AuthService } from '../../user/auth.services';
import { VoterService } from './voters.service';

@Component({
    selector: 'session-list',
    template: `
    <div class="row" *ngFor="let session of visibleSessions"> 
  <div class="col-md-1"> 
    <div *ngIf="auth.isAuthentificated()">
    <upvote (vote)="toggleVote(session)" [count]="session.voters.length"
    [voted]="userHasVoted(session)">
  </upvote>
</div>
  </div>

    <div class="col-md-10">
      <collapsible-well [title]="session.name">
        <div well-title>
          {{session.name}}
          <i *ngIf="session.voters.length > 3" class="glyphicon glyphicon=fire" style="color:red"></i>
        </div>
          <div well-body>
          <h6>{{session.presenter}}</h6>
          <span>Duration: {{session.duration |duration}}</span><br />
          <span>Level: {{session.level}}</span>
          <p>{{session.abstr}}</p>
          </div>
      </collapsible-well>
    </div>
  </div>
    `
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId:number;
    visibleSessions: ISession[] = []

    constructor(private auth:AuthService,private voterService: VoterService){}
    ngOnChanges() {
        if(this.sessions) {
            this.filterSession(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) :
             this.visibleSessions.sort(SortbyVotesDesc);
        }
    }
    toggleVote(session: ISession) {
        if (this.userHasVoted(session)){
            this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName)
        } else {
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
        }
        if (this.sortBy === 'votes') {
        this.visibleSessions.sort(SortbyVotesDesc);
        }
    }
    userHasVoted(session: ISession) {
        console.log("User has voted is called")
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName)
    }
    filterSession(filter) {
        if (filter === 'all'){
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            });
        }
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) { return 1; } else if (s1.name === s2.name) { return 0; } else { return -1; }
}

function SortbyVotesDesc(s1: ISession, s2: ISession) {
return s2.voters.length - s1.voters.length;
}

