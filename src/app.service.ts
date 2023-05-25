import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import 'isomorphic-fetch';
import { map, Observable } from 'rxjs';

export interface Quote {
  quote: string;
  author: string;
}

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  private quotes = [
    'The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela',
    'The way to get started is to quit talking and begin doing. -Walt Disney',
    "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs",
    'If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt',
    "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. -Oprah Winfrey",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. -James Cameron",
    "Life is what happens when you're busy making other plans. -John Lennon",
  ];

  getHello(): string {
    return 'Hello World!';
  }

  async getIsomorphic() {
    return await fetch('https://quotes-api.prakticum-team.ru/quote/random').then((resp) => resp.json());
  }

  getRandom(): string {
    return this.quotes[~~(Math.random() * this.quotes.length)];
  }

  async getYaRandom() {
    return this.httpService
      .get('https://quotes-api.prakticum-team.ru/quote/random')
      .pipe(
        map((response) => response.data),
        map((data) => {
          return {
            quote: data.quote,
            author: data.author,
          };
        }),
      );
  }

  anotherAttempt(): Observable<Quote> {
    return this.httpService
      .get('https://quotes-api.prakticum-team.ru/quote/random')
      .pipe(map((response) => response.data));
  }
}
