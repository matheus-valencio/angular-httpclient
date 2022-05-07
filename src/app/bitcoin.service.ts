import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Response {
  time: {
    updated: string;
  };
  bpi: {
    USD: {
      symbol: string;
      rate_float: number;
    };
    BRL: {
      symbol: string;
      rate_float: number;
    };
  };
}

@Injectable()
export class BitcoinService {
  current: Response;
  list: Array<Response> = [];
  private timer: any;

  constructor(private http: HttpClient) {}

  start() {
    this.http
      .get<Response>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        this.current = data;
        this.list.push(data);
      });
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.http
          .get<Response>(
            'https://api.coindesk.com/v1/bpi/currentprice/BRL.json'
          )
          .subscribe((data) => {
            if (data.bpi.USD.rate_float == this.current.bpi.USD.rate_float) {
            } else {
              this.current = data;
              this.list.push(data);
            }
          });
      }, 60000);
    }
  }
}
