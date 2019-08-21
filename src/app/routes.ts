import {Routes} from '@angular/router'
import {EventsListsComponent,
  EventListResolver,
  CreateEventComponent,
  EventDetailsComponent,
  CreateSessionComponent} from './events'
import { Error404Component } from './errors/404.component';
import { EventResolver } from './events/event-resolver.service';

export const appRoutes: Routes=[
    { path:'events/new',component: CreateEventComponent,
      canDeactivate: ['CanDeactivateCreateEvent'] },
    { path:'events',component: EventsListsComponent,resolve:
    {events:EventListResolver }},
    { path:'events/:id',component:EventDetailsComponent},
      {path:'events/sessions/new', component:CreateSessionComponent},
    { path:'404',component: Error404Component },
    { path: '',redirectTo:'/events',pathMatch:'full' },
    {path: 'user', loadChildren: './user/user.module#UserModule'}
]