import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private endpoint = `https://api.github.com`

  constructor(private httpClient: HttpClient) { }

  fetchGithubProfile(username: string): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/users/${username}`).pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  fetchGithubRepos(username: string) {
    return this.httpClient.get(`${this.endpoint}/users/${username}/repos`).pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  private processError(err) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
