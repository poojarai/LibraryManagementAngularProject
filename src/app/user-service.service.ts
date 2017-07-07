import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserServiceService {
  private serviceUrl = 'assets/json/userData.json';

  constructor(private http: Http) { }
  getUserData(): Observable<any> {
    return this.http.get(this.serviceUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.log("response: ", error);
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

/****** 
To start off with, Observables are nothing but a stream of data.These data streams can be of anything - a stream of variables, properties, data structures or even stream of events. One can react to the stream by listening to it. Observables are basically based on Observer Design Pattern. In Observer Design Pattern one-to-many dependency is maintained between the objects, when one object changes its state all other objects/dependents are notified. These dependents are known as Observers.

A stream can emit 3 different things:

Value
Error
Completed signal
Suppose that stream is a stream of events being observed. A function is defined that will be executed when a value is emitted, another function executes when an error is emitted and a third one once the complete signal is emitted. One can capture these events by using these functions. These functions are known as Observers and the stream which is being emitted is the Observable.

Observables can be of two types:

1.Hot - Hot observables are those which produce values even before their subscription gets activated. One can consider Hot Observables as live performance. The hot observable sequence is shared among each subscriber, also each subscriber gets the next value in the sequence.

2.Cold - Cold observables behave like standard iterators. They push values only when we subscribes to them and they reset when we subscribe again. One can consider Cold Observables as a movie.

*/