import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Anime_data } from '../../interfaces/anime';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  @Input() details: Anime_data;
  @Output() closeDeets = new EventEmitter<void>();
  episodes: number[] = [];
  showAbout: boolean = true;
  showEpisodes: boolean = false;
  movie: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    sessionStorage.clear();
    if (this.details.episodes == 1) {
      this.movie = true;
    } else {
      this.episodes = [];
      for (let i = this.details.episodes; i >= 1; i--) this.episodes.push(i);
    }
  }

  watch(ep: string) {
    sessionStorage.setItem('last', this.router.url);
    this.router.navigate(['watch/', this.details.mal_id, ep]);
  }

  ClickOutside = () => {
    this.closeDeets.emit();
  };

  routeGenre(genre: string) {
    this.router.navigate(['/tileView', genre, '1']);
  }
}
