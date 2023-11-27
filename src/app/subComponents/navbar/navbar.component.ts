import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { Genre_type } from 'src/app/interfaces/anime';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  genreList: Genre_type[] = [
    {
      mal_id: 1,
      name: 'Action',
    },
    {
      mal_id: 2,
      name: 'Adventure',
    },
    {
      mal_id: 5,
      name: 'Avant Garde',
    },
    {
      mal_id: 46,
      name: 'Award Winning',
    },
    {
      mal_id: 28,
      name: 'Boys Love',
    },
    {
      mal_id: 4,
      name: 'Comedy',
    },
    {
      mal_id: 8,
      name: 'Drama',
    },
    {
      mal_id: 10,
      name: 'Fantasy',
    },
    {
      mal_id: 26,
      name: 'Girls Love',
    },
    {
      mal_id: 47,
      name: 'Gourmet',
    },
    {
      mal_id: 14,
      name: 'Horror',
    },
    {
      mal_id: 7,
      name: 'Mystery',
    },
    {
      mal_id: 22,
      name: 'Romance',
    },
    {
      mal_id: 24,
      name: 'Sci-Fi',
    },
    {
      mal_id: 36,
      name: 'Slice of Life',
    },
    {
      mal_id: 30,
      name: 'Sports',
    },
    {
      mal_id: 37,
      name: 'Supernatural',
    },
    {
      mal_id: 41,
      name: 'Suspense',
    },
  ];

  @ViewChild('searchInput') searchInput: ElementRef;
  term: string = null;

  constructor(private router: Router, public loader: LoaderService) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        e.preventDefault();
        if (this.term != null) {
          this.router.navigate(['/tileView', 'search', '1'], {
            queryParams: { term: this.term },
          });
        }
      }
    });
  }

  onSelect(genre: string) {
    this.router.navigate(['/tileView', genre, '1']);
  }

  clearSearch() {
    this.term = null;
  }
}
