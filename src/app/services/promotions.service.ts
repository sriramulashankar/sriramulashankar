import { Inject,Injectable } from '@angular/core';
// import { resolve } from 'dns';
import { Promotion } from '../shared/promotion';
import { Observable} from 'rxjs';
// import { delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map,catchError} from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http:HttpClient,
  @Inject ('processHTTPMsgService') private ProcessHTTPMsgService:any) { }

  getPromotions(): Observable<Promotion[]>{
    // return this.http.get(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'PROMOTIONS')
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion>{
    // return this.http.get(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotion/' + id)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getFeaturedPromotion():Observable<Promotion> {
    // return of (PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotion?featured=true').pipe(map(PROMOTIONS => PROMOTIONS[0]))
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
}
}
