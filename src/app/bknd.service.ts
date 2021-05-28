import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { anime } from './interfaces/anime';

@Injectable({
  providedIn: 'root'
})
export class BkndService {

  constructor(private http:HttpClient ) { }

  getPopular(page: string) {
    return this.http.get(environment.popular+page);
  }

  getRecents(page: string) {
    return this.http.get(environment.recentadd+page);
  }

  getSearch(searchTerm: string, page: string) {
    return this.http.get(environment.search+searchTerm+"/"+page);
  }

  getGenre(genre: string, page: string) {
    return this.http.get(environment.genre+genre+"/"+page);
  }

  getDetails(id: string){
      return this.http.get(environment.details+id)
  }

  getWatch(id:string, ep:string) {
    return this.http.get(environment.watching+id+"/"+ep)
  }
}
