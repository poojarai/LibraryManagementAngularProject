import {Injectable} from '@angular/core';
import {Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
    
@Injectable()
export class CarService {
    
    constructor(private http: Http) {}

    getCarsData() {
        return this.http.get('assets/json/carData.json')
                    .map(res => res.json());
    }
}