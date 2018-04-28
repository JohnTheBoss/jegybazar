import {Injectable} from '@angular/core';
import {TicketService} from './ticket.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class BidService {

  constructor(private _ticketService: TicketService,
              private _http: HttpClient) {
  }

  bid(ticketId: string, value: number) {
    // TODO replace userID
    const userId = 'csS0YbxGiiVw8aiOkhOo4gnkUYL2';
    return this._http.put(`${environment.firebase.baseUrl}/bids/${ticketId}/${userId}.json`, value)
      .flatMap(
        () => {
          return this._ticketService.getOne(ticketId);
        }
      )
      .flatMap(
        ticket => {
          return this._ticketService.modify(Object.assign(ticket, {currentBid: value, bidCounter: ++ticket.bidCounter}));
        }
      );
  }

}
