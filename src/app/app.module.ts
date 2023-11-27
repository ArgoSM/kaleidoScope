import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SplashComponent } from './splash/splash.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './subComponents/navbar/navbar.component';
import { TileComponent } from './subComponents/tile/tile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TileViewComponent } from './tile-view/tile-view.component';
import { DetailsComponent } from './subComponents/details/details.component';
import { WatchComponent } from './watch/watch.component';
import { WatchResolverGuard } from './watch/watch-resolver.guard';
import { ClickOutsideDirective } from './subComponents/details/click-outside.directive';
import { LoaderComponent } from './subComponents/loader/loader.component';
import { CookieService } from 'ngx-cookie-service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './subComponents/loader/interceptor.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    HomeComponent,
    NavbarComponent,
    TileComponent,
    TileViewComponent,
    DetailsComponent,
    WatchComponent,
    ClickOutsideDirective,
    LoaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
  ],
  providers: [
    WatchResolverGuard,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
