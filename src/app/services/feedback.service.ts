import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError,Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http:HttpClient,
    @Inject('processHTTPMsgService') private ProcessHTTPMsgService:any) { }
    submitFeedback(): Observable<Feedback>{
      // return this.http.post(Feedback).pipe(delay(2000));
      return this.http.post<Feedback>(baseURL + 'Feedback')
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }
}
