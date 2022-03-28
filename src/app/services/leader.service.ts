import { Inject, Injectable } from '@angular/core';
// import { resolve } from 'dns';
import { Leader } from '../shared/leader';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient,} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    @Inject ('processHTTPMsgService') private ProcessHTTPMsgService:any) { }

  getLeaders(): Observable<Leader[]>{
    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'LEADERS')
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getLeader(id:string): Observable<Leader> {
    // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'LEADERS/' + id)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    // return of(LEADERS.filter((Leader) => Leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'Leader?featured=true').pipe(map(LEADERS => LEADERS[0]))
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}
