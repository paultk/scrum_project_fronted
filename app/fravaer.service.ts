import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Fravaer} from "./fravaer";
import 'rxjs/add/operator/toPromise';
import {JsonTestClass} from "./json-test-class";
import {Vakt} from "./vakt";

@Injectable()
export class FravaerService {
  constructor(
    private http: Http
  ){}

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  testConnect2(jsonTest: JsonTestClass): void {
    this.http
      .post('http://localhost:8080/test/json', JSON.stringify(jsonTest), {headers: this.headers},)
      .toPromise()
      .then(res => console.log(res))
      .catch(this.handleError);
  }

  testConnect(): void {
    console.log('ping');
    this.http
      .get('http://localhost:8080/test',)
      .toPromise()
      .then(res => console.log(res))
      .catch(this.handleError);
  }

  registerFravaer(fravaer: Fravaer): void {
    const URL = 'http://localhost:8080/fravaer/add';
    console.log("from fravaerService");
    this.http
      .post(URL, JSON.stringify(fravaer), {headers: this.headers},)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getFravaerliste(): Promise<Fravaer[]> {
    const URL = 'http://localhost:8080/fravaer';
    return this.http
      .get(URL)
      .toPromise()
      .then(res => res.json().data as Fravaer[])
      .catch(this.handleError);
  }

  getVaktliste(): Promise<Vakt[]> {
    const URL = 'http://localhost:8080/vakt/all';
    return this.http
      .get(URL)
      .toPromise()
      .then(res => res.json().data as Vakt[])
      .catch(this.handleError);

  }

  getFravaerByUser(id: number): Promise<Fravaer[]> {
    return this.getFravaerliste()
      .then(fravaerliste => fravaerliste.filter(fravaerliste => fravaerliste.brukerId === id));
  }

  getFravaerByVakt(id: number): Promise<Fravaer[]> {
    return this.getFravaerliste()
      .then(fravaerliste => fravaerliste.filter(fravaerliste => fravaerliste.vaktId === id));
  }

  getFravaerByDate(date: string): Promise<Fravaer[]> {
    return this.getFravaerliste()
      .then(fravaerliste => fravaerliste.filter(fravaerliste => fravaerliste.fraTid));
  }

  getVaktByDate(date: string): Promise<Vakt[]> {
    const URL = 'http://localhost:8080/vakt/all/${date}';

    return this.http.get(URL)
      .toPromise()
      .then(res => res.json().data as Vakt[])
      .catch(this.handleError);

    /*return this.getVaktliste()
      .then(vaktliste => vaktliste.filter(vaktliste => vaktliste.fra_tid.substr(0, 10) === date));*/
  }
}
