import {Component} from '@angular/core';
import {
    AlgorithmResult,
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
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private static readonly ALGORITHM_NAME = 'validate a run';
    private static readonly RESULT_FILE_NAME = 'result.txt';

    FD_PN = FD_PETRI_NET;
    FD_PO = FD_PARTIAL_ORDER

    petriNet: PetriNet | undefined;
    partialOrder: PartialOrder | undefined;

    resultFile: DropFile | undefined;

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
            this.resultFile = undefined;
            try {
                const validator = new LpoFlowValidator(this.petriNet, this.partialOrder);

                const start = performance.now();
                const results = validator.validate();
                const end = performance.now();

                const result = new AlgorithmResult(AppComponent.ALGORITHM_NAME, start, end);
                const places = this.petriNet.getPlaces();
                for (let i = 0; i < places.length; i++) {
                    result.addOutputLine(`${places[i].id} ${results[i] ? 'valid' : 'not valid'}`);
                }
                this.resultFile = result.toDropFile(AppComponent.RESULT_FILE_NAME);
            } catch (e) {
                const error = e as Error;
                const result = new AlgorithmResult(AppComponent.ALGORITHM_NAME);
                result.addOutputLine(error.message);
                this.resultFile = result.toDropFile(AppComponent.RESULT_FILE_NAME);
            }
        }
    }
}
