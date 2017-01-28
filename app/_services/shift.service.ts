import {Http, Response, Headers} from "@angular/http";
import {Shift} from "../_models/shift";
import {User} from "../_models/user";
import {Injectable} from "@angular/core";
import { USERS } from '../_mock/mock-ansatte';
import {Observable} from "rxjs";

const shifts = [
  // new Shift(new User(1, 1, 1, 3232, 12, 121, false, 'fefe', 'fdg', 'sdffsd',3, 'testUser1'), 3, 12),
  new Shift(USERS[0], 3, 12),
  new Shift(USERS[1], 2, 15),
  new Shift(USERS[2], 3, 17),
];

@Injectable()
export class ShiftService {
  constructor(
    private http: Http,
  ){}
  private headers = new Headers({'Content-Type': 'application/json'});
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
  //
  // todo: fix avdelingsId
  getShifts(date: Date): Observable<any>{
    let url = `http://localhost:8080/vakt/all/month/${date.toISOString().substr(0, 7)}-01T12:00:00+01:00/2`;
    let time = new Date();
    console.log('first' + time);
    return this.http.get(url).map(
      (response: Response) => response.json()
    );
  }


  getShifts1(date: Date): void{
    let url = 'http://localhost:8080/vakt/all/month/2017-01-01T12:00:00+01:00/2';

    this.http.get(url).toPromise().then(
      (response) => console.log(response)
    );
    console.log(url);
    /*
     *
     getUsers(): Observable<User[]> {
     return this.http.get(this.UsersURL).map((response: Response) =>
     response.json());
     }*/
  }

  getShiftsUsersCanWork(date:  Date): Shift[] {
    return shifts;
  }


  addShift(shift: Shift, date: string): void {


    // todo: possibly fix avdId
    let tempTid = shift.toTime;
    if(tempTid == 0) date += '07:00';
    else if(tempTid == 0) date += '15:00';
    else if(tempTid == 0) date += '23:00';

    let url = `http://localhost:8080/bruker/addtid/${date}/2`;
    console.log("user:");
    console.log(JSON.stringify(shift.user));
    /*
    this.http.post(url, JSON.stringify(shift.user), {headers: this.headers}).toPromise()
      .then((response) => console.log(response))
      .catch( (error) => this.handleError(error));*/
  }

  //todo: urgent fix on how date in url gets managed
  getAvailables(date: Date) {
    let dateTo = date.toISOString().substr(0, 7);
    let url = `http://localhost:8080/tilgjengelighet/all/${dateTo}-01T00:00:00/${dateTo}-28T00:00:00`;
    console.log(url);
    return this.http.get(url).map(
      (response: Response) => response.json()
    );
  }

  addAvailability(availability: any) {
    let tempObj = JSON.stringify(availability);
    console.log('json:');
    console.log(tempObj);

    let url = 'http://localhost:8080/tilgjengelighet/add';
    this.http.post(url, JSON.stringify(availability), {headers: this.headers}).toPromise()
      .then((response) => console.log(response))
      .catch( (error) => this.handleError(error));
  }
}
