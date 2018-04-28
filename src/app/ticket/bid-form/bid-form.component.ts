///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {bidMinimumValidator} from './bid.validators';
import {BidService} from '../../shared/bid.service';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit, OnChanges {
  @Input() ticket: TicketModel;
  @Output() bid = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;
  submitSuccessAlert = false;
  submitErrorAlert = false;
  disabled = false;

  constructor(private _fb: FormBuilder,
              private _bidService: BidService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticket'] !== null && !changes['ticket'].isFirstChange() && changes['ticket'].currentValue != null) {
      this.disabled = false;
      this.form.reset({bid: null});
      this.form.get('bid').enable();

    }
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
              bidMinimumValidator(() => {
                return this.ticket;
              })
            ]
          )
        ]
      }
    );

    // folytonos változás megjelenítése
    // this.form.get('bid').valueChanges.subscribe(
    //   val => console.log('bid change', val)
    // );
    //
    // this.form.valueChanges.subscribe(
    //   val => console.log('form change', val)
    // );
  }

  onBidWithBidStep() {
    this.toBid(this.ticket.currentBid + this.ticket.bidStep)
      .subscribe(
        () => {
          // notification user
          this.submitSuccessAlert = true;
          this.bid.emit();
          this.form.get('bid').enable();
        },
        err => {
          console.error(err);
          this.submitErrorAlert = true;
        }
      );
  }

  toBid(value: number) {
    this.submitSuccessAlert = false;
    this.submitErrorAlert = false;
    this.form.get('bid').disable();
    this.disabled = true;

    return this._bidService.bid(this.ticket.id, value);
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.toBid(this.form.value['bid'])
        .subscribe(() => {
            this.submitted = false;
            // notify user
            this.submitSuccessAlert = true;
            this.bid.emit();
          },
          err => {
            this.submitErrorAlert = true;
            console.error(err);
          }
        );
    }
    console.log('licit volt');
    console.log(this.form.value);
    console.log(this.form.valid);
  }
}
