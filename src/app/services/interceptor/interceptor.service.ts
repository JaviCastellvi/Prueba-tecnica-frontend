import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subscription, timer } from 'rxjs';
import { finalize} from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';


@Injectable({
  providedIn: 'root'
})
export class HttpFactory implements HttpInterceptor {

  pendingRequests = 0;
  timerSub$!: Subscription

  constructor(private loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.pendingRequests++;
    this.loaderService.show();
    
    return next.handle(req)
    .pipe(
      finalize(() => {
        
        this.timerSub$ = timer(250).subscribe(()=>{
          
          this.pendingRequests--;

          if (this.pendingRequests === 0) {
            this.timerSub$.unsubscribe();
            this.loaderService.hide();
            
          }

        });

      })
  
    )
  }

}



