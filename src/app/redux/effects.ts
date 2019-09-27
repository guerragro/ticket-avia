import { Injectable } from '@angular/core';

import {Effect, Actions, ofType} from '@ngrx/effects';

import { TicketService } from '../service/ticket.service';
import {select, Store} from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';

import * as appState from '../redux/ticket.reducer';
import * as fromAction from '../redux/ticket.action';

@Injectable()
export class TicketEffects {

  constructor(
    public service: TicketService,
    public store: Store<appState.State>,
    public actions$: Actions
  ) {}

  // эффект отслеживает любое возникновение экшена, а конкретно loadCities, перехватывает его
  // и запускает запрос на сервер, который передает информацию следующем экшену
  @Effect()
  loadCities = this.actions$
    .pipe(
      ofType(fromAction.TICKET_ACTION.LOAD_CITIES),
      mergeMap(() => this.service.getDataCities().pipe(
        map(cities => new fromAction.LoadCitiesOk(cities)))),
        // catchError(() => new fromAction.LoadCitiesErr())
      );

  // pipe позволяет использовать несколько операторов
  @Effect()
  loadTicket = this.actions$
    .pipe(
      ofType(fromAction.TICKET_ACTION.SEARCH_TICKET),
      mergeMap(() => this.service.getPriceMonth().pipe(
        map((ticket: []) => new fromAction.SearchTicketOk(ticket)))
      )
    );
}

//   @Effect()
//   loadCities$ = this.actions$
//     .pipe(
//       ofType(ArticlesActions.LoadArticles),
//       mergeMap(() => this.articlesService.getArticles().pipe(
//         map(articles => (new ArticlesLoadedSuccess({articles: articles}))),
//         catchError(() => of(new ArticlesLoadedError())
//         ))
//       )
//     );
//
//   constructor(
//     private actions$: Actions,
//     private articlesService: ArticlesService
//   ) {}
// }