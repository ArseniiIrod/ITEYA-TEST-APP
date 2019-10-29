import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { RegisteredUser } from '../app/models';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const registeredUser: RegisteredUser = {
      id: 1,
      username: 'test',
      password: 'test'
    };

    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.endsWith('/api/authenticate') &&
            request.method === 'POST'
          ) {
            if (
              request.body.username === registeredUser.username &&
              request.body.password === registeredUser.password
            ) {
              return ok({
                id: registeredUser.id,
                username: registeredUser.username,
                token: `fake-jwt-token`
              });
            } else {
              return error('Username or password is incorrect!');
            }
          }
          return next.handle(request);
        })
      )

      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
