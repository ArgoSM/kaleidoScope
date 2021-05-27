import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BkndService } from './../bknd.service';

@Injectable({
  providedIn: 'root'
})
export class WatchResolverGuard implements Resolve<any> {
  
  constructor( private bknd: BkndService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.bknd.getWatch(route.params['id'], route.params['ep']);
  }
}
