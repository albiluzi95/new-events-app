import { Component } from "@angular/core";

@Component({
    template:'<h1 class="error-message">404 error</h1>',
    styles:[`
    .error-message{
        margin-top: 150px;
        font-size: 170px;
        text-align: center;
    }
    `]
})
export class Error404Component{
    constructor(){}
}