import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.css']
})
export class BiddingCardComponent implements OnInit {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: boolean;
  @Output() refreshTicket = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onBidWithBidStep() {
    this.refreshTicket.emit();
  }
}
