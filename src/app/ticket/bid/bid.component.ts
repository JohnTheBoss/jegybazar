import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;

  constructor(private _ticketService: TicketService, _userService: UserService, private _route: ActivatedRoute, private _router: Router) {
    this.isLoggedIn = true; //_userService.isLoggedin;
  }

  ngOnInit() {
    const handle404 = () => {
      this._router.navigate(['404']);
    };
    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = params.get('id') || '';
        this._ticketService.getOne(id).subscribe(
          ticket => {
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
    );
  }

  onBidWithBidStep() {
    alert('gomb nyomkodvaa');
  }

}
