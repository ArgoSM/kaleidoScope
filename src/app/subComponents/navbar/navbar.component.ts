import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  genreList:string[]=[
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Dub",
    "Ecchi",
    "Family",
    "Fantasy",
    "Game",
    "Harem",
    "Hentai",
    "Historical",
    "Horror",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shoujo Ai",
    "Shounen",
    "Shounen Ai",
    "Slice of Life",
    "Space",
    "Sports",
    "Super Power",
    "Supernatural",
    "Thriller",
    "Vampire",
    "Yaoi",
    "Yuri"
  ];

  @ViewChild('searchInput') searchInput:ElementRef;
  term: string="";

  constructor(private router: Router, public loader: LoaderService) { }
  
  ngAfterViewInit(): void {
    this.searchInput.nativeElement.addEventListener('keyup',(e)=> {
      if(e.keyCode == 13) {
        e.preventDefault();
        if(this.term!=null){
          this.router.navigate(['/tileView',"search","1"], { queryParams: { term: this.term }});
      }}
    });
  }

  ngOnInit(): void { }

  onSelect(genre:string) {
    this.router.navigate(['/tileView',genre,"1"]);
  }
}
