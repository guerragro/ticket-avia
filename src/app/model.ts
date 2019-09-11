export class TicketModel {

  // то как будет выглядит наш объект
  constructor(
    public origin: string,
    public destination: string,
    public depart_date?: string,
    public return_date?: string,
    public id?: number,
  ) {}
}

export interface CitiesModel {
  code: string;
  name: string;
  time_zone: string;
  name_transparante: object;
  coordinates: object;
  cases: object;
}

// export interface TicketInterface {
//   model: TicketModel[];
// }
