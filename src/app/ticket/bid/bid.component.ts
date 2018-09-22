import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit, OnDestroy {
  ticket$: Observable<TicketModel>;
  isLoggedIn$: Observable<any>;
  progressRefeshTicket = false;
  private ticketWatcherSubscription: Subscription;

  constructor(private _ticketService: TicketService, _userService: UserService, private _route: ActivatedRoute, private _router: Router) {
    this.isLoggedIn$ = _userService.isLoggedin$;
  }

  ngOnDestroy(): void {
    // leiratkozik, amikor bezáródik a komponens
    this.ticketWatcherSubscription.unsubscribe();
  }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = params.get('id') || '';
        this.refreshTicket(id);
      }
    );
  }

  private refreshTicket(id) {
    this.progressRefeshTicket = true;
    const handle404 = () => {
      this._router.navigate(['404']);
    };

    this.ticket$ = this._ticketService.getOne(id).share();
    this.ticketWatcherSubscription = this.ticket$.subscribe(
      ticket => {
        this.progressRefeshTicket = false;
        if (ticket === null) {
          handle404();
        }
      }, () => {
        return handle404();
      }
    );
  }
}
