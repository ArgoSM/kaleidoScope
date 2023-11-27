import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BkndService } from './../bknd.service';
import { Anime_data, Data_pack } from './../interfaces/anime';

@Component({
  selector: 'app-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.css'],
})
export class TileViewComponent implements OnInit {
  constructor(
    private bknd: BkndService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  animeList: Anime_data[] = [];
  deet: Anime_data;
  id: string = '';
  term: string = '';
  show_deets: boolean = false;
  show_prev: boolean = false;
  show_next: boolean = false;
  page: number = 1;
  no_content = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.page = parseInt(params['page']);
      switch (this.id) {
        case 'popular': {
          this.popular();
          break;
        }
        case 'recents': {
          this.recents();
          break;
        }
        case 'search': {
          this.route.queryParams.subscribe((data) => {
            this.term = data['term'];
            this.search(this.term);
          });
          break;
        }
        default: {
          this.genre(this.id);
        }
      }
    });
  }

  clickTile(an: Anime_data) {
    this.deet = an;
    this.show_deets = true;
  }

  closeDeets() {
    this.show_deets = false;
  }

  popular() {
    this.bknd.getPopular(this.page).subscribe((data: Data_pack) => {
      this.listData(data);
    });
  }

  recents() {
    this.bknd.getRecents(this.page).subscribe((data: Data_pack) => {
      this.listData(data);
    });
  }

  genre(genre: string) {
    this.bknd.getGenre(genre, this.page).subscribe((data: Data_pack) => {
      this.listData(data);
    });
  }

  search(term: string) {
    this.bknd.getSearch(term, this.page).subscribe((data: Data_pack) => {
      this.listData(data);
    });
  }

  listData(data: Data_pack) {
    this.show_prev = false;
    this.show_deets = false;
    this.show_next = data.pagination.has_next_page;
    this.no_content = false;
    this.animeList = data.data;

    if (this.animeList.length == 25) this.show_next = true;
    else if (this.animeList.length == 0) this.no_content = true;

    if (data.pagination.current_page > 1) this.show_prev = true;
  }

  pager(n: number) {
    if (this.id == 'search')
      this.router.navigate(['/tileView', 'search', n], {
        queryParams: { term: this.term },
      });
    else this.router.navigate(['/tileView', this.id, n]);
  }
}
