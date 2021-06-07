import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TileViewComponent } from './tile-view/tile-view.component';
import { WatchComponent } from './watch/watch.component';
import { WatchResolverGuard } from './watch/watch-resolver.guard';
import { DetailsResolverGuard } from './subComponents/details/details-resolver.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path:"home",component: HomeComponent },
  { path:"tileView/:id/:page",component: TileViewComponent },
  { path:"watch/:id/:ep",component: WatchComponent, resolve: { watch: WatchResolverGuard, detail: DetailsResolverGuard }}, 
  { path:"",redirectTo:"/home",pathMatch:"full" },
  { path:"404", component: NotFoundComponent},
  { path:"**", redirectTo:"/404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [WatchResolverGuard, DetailsResolverGuard]
})
export class AppRoutingModule { }
