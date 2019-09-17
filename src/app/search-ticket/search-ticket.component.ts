import { Component, OnInit } from '@angular/core';
import { CitiesModel, TicketModel } from '../model';
import {TicketService} from '../service/ticket.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAction from '../redux/ticket.action';
import * as appState from '../redux/app.state';
import {State} from '../redux/ticket.reducer';

@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrls: ['./search-ticket.component.css']
})
export class SearchTicketComponent implements OnInit {

  origin: string;
  destination: string;
  departureDate: any;
  arrivalDate: any;
  id: number = 0;
  checked: boolean;

  cities$: Observable<CitiesModel[]>;
  cities;

  constructor(
    public _ticketService: TicketService,
    public store: Store<appState.State>,
  ) {
    this.cities$ = this.store.select(appState.getStateCities);
    this.cities$.subscribe(res => this.cities = res);
    // console.log(this.cities);
    // console.log(this.cities$);
  }

  ngOnInit() {
  }

  // search(event) {
  //   if (this.origin === '' && this.destination === '' && this.departureDate === '' && this.arrivalDate === '') {
  //     return;
  //   } else {
  //     this.id++;
  //     // this._ticketService.getPriceList(new TicketModel(this.origin, this.destination)).subscribe(
  //     //   res => console.log(res),
  //     //   err => console.log(err)
  //     // );
  //     // const ticketModel = new TicketModel(this.origin, this.destination, this.departureDate, this.arrivalDate, this.id);
  //     //       // console.log(ticketModel);
  //     // this.store.select(new fromAction.TicketReQ(new TicketModel(this.origin, this.destination)));
  //     this._ticketService.getDataMonth(new TicketModel(this.origin, this.destination)).subscribe(
  //       res => {
  //         this.store.dispatch(new fromAction.TicketReS(res));
  //         console.log(res);
  //       },
  //       err => console.log(err)
  //     );
  //     // this.store.dispatch(new fromAction.Ticket());
  //     //       // this.store.dispatch(ticketModel);
  //   }
  //   // this.model.push(this.ticketModel);
  //   // console.log(this.model);
  // }

  // true = цены с партнерским маркетом, false наоборот
  onToggle(event) {
    console.log(event.target.checked);
    this.checked = event.target.checked;
  }

//  если нет прямого вылета, должна срабатывать мой метод
//
  search(data) {
    // получаем авиабилеты на месяц, находим самый дешевый туда обратно
    this.store.dispatch(new fromAction.SearchTicket());
  }
  checkTicket(data) {
    console.log(data);
  }

}
