import {Component, Input, OnInit} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.css']
})
export class BiddingCardComponent implements OnInit {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  onBidWithBidStep() {
    alert('bidd van');
  }
}
