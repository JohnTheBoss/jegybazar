import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn$: Observable<any>;
  progressRefeshTicket = false;

  constructor(private _ticketService: TicketService, _userService: UserService, private _route: ActivatedRoute, private _router: Router) {
    this.isLoggedIn$ = _userService.isLoggedin$;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = params.get('id') || '';
        this.refreshTicket(id);
      }
    );
  }

  onRefreshTicket() {
    this.refreshTicket(this.ticket.id);
  }

  private refreshTicket(id) {
    this.progressRefeshTicket = true;
    const handle404 = () => {
      this._router.navigate(['404']);
    };

    this._ticketService.getOne(id).subscribe(
      ticket => {
        this.progressRefeshTicket = false;
        if (ticket === null) {
          handle404();
        } else {
          this.ticket = ticket;
        }
      }, () => {
        return handle404();
      }
    );
  }
}
