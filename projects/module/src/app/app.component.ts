import {Component} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {
    FD_PARTIAL_ORDER,
    FD_PETRI_NET,
    PetriNet,
    PartialOrder,
    PetriNetParserService,
    PartialOrderParserService,
    DropFile,
    LpoFlowValidator
} from 'ilpn-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/ilovepetrinets/rabbit/'}
    ]
})
export class AppComponent {

    fdPN = FD_PETRI_NET;
    fdPO = FD_PARTIAL_ORDER

    petriNet: PetriNet | undefined;
    partialOrder: PartialOrder | undefined;

    constructor(private _pnParser: PetriNetParserService, private _poParser: PartialOrderParserService) {
    }

    parsePN(files: Array<DropFile>) {
        if (files.length === 0) {
            this.petriNet = undefined;
        }
        this.petriNet = this._pnParser.parse(files[0].content);
        console.dir(this.petriNet);
        this.validate();
    }

    parsePO(files: Array<DropFile>) {
        if (files.length === 0) {
            this.partialOrder = undefined;
        }
        this.partialOrder = this._poParser.parse(files[0].content);
        console.dir(this.partialOrder);
        this.validate();
    }

    private validate() {
        if (this.petriNet !== undefined && this.partialOrder !== undefined) {
            const validator = new LpoFlowValidator(this.petriNet, this.partialOrder);
            console.log(validator.validate())
        }
    }
}
