///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {bidMinimumValidator} from './bid.validators';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit {

  @Input() ticket: TicketModel;
  @Output() bidWithBidStep = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this._fb.group(
      {
        // bid: null, // sima
        // bid: [null, Validators.required] // 1 validator
        bid: [
          null,
          Validators.compose(
            [
              Validators.required,
              bidMinimumValidator(this.ticket.currentBid + this.ticket.bidStep)
            ]
          )
        ]
      }
    );
  }

  onBidWithBidStep() {
    this.bidWithBidStep.emit();
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;
    console.log('licit volt');
    console.log(this.form.value);
    console.log(this.form.valid);
  }
}
