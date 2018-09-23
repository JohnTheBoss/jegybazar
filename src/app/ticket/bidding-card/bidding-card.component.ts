import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.css']
})
export class BiddingCardComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticket'] != null
      && !changes['ticket'].isFirstChange()
      && changes['ticket'].currentValue != null) {
      this.loading = false;
    }
  }

  @Input() ticket: TicketModel;
  @Input() isLoggedIn: boolean;
  loading = false;
  @Output() bid = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onBidWithBidStep() {
    this.loading = true;
    this.bid.emit();
  }
}
