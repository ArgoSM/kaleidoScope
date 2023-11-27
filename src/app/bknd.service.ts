import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BkndService {
  constructor(private http: HttpClient) {}

  getPopular(page: number) {
    return this.http.get(environment.top + `?page=${page}&filter=bypopularity`);
  }

  getRecents(page: number) {
    return this.http.get(environment.top + `?page=${page}&filter=airing`);
  }

  getSearch(searchTerm: string, page: number) {
    return this.http.get(environment.search + `?q=${searchTerm}&page=${page}`);
  }

  getGenre(genre: string, page: number) {
    return this.http.get(environment.search + `?genres=${genre}&page=${page}`);
  }

  getDetails(id: string) {
    return this.http.get(environment.search + id);
  }

  getWatch(id: string, ep: string) {
    return this.http.get(environment.search + id + '/' + ep);
  }
}
