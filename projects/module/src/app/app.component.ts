import {Component} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {FD_PARTIAL_ORDER, FD_PETRI_NET} from 'ilpn-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        // TODO base href
        {provide: APP_BASE_HREF, useValue: '/ilovepetrinets/'}
    ]
})
export class AppComponent {

    fdPN = FD_PETRI_NET;
    fdPO = FD_PARTIAL_ORDER

}
