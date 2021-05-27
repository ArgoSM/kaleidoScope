import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { anime } from './interfaces/anime';

@Injectable({
  providedIn: 'root'
})
export class BkndService {

  private page_count: number=1; 

  constructor(private http:HttpClient ) { }

  getPopular() {
    return this.http.get(environment.popular+this.page_count.toString());
  }

  getRecents() {
    return this.http.get(environment.recentadd+this.page_count.toString());
  }

  getSearch(searchTerm: string) {
    return this.http.get(environment.search+searchTerm+"/"+this.page_count.toString());
  }

  getGenre(genre: string) {
    return this.http.get(environment.genre+genre+"/"+this.page_count.toString());
  }

  getDetails(id: string){
      return this.http.get(environment.details+id)
  }

  getWatch(id:string, ep:string) {
    return this.http.get(environment.watching+id+"/"+ep)
  }
}
