import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthService } from 'src/app/services/auth.service';

describe('AuthEffects', () => {
  let actions$: Observable<any>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({})
    ],
    providers: [
      Store,
      provideMockActions(() => actions$),
      {
        provide: AuthService,
        useValue: jasmine.createSpyObj('authService', [
          'redirect',
          'verify'
        ])
      }
    ]
  }));

  it('should be created', () => {
    const service: AuthEffects = TestBed.get(AuthEffects);
    expect(service).toBeTruthy();
  });
});
