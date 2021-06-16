import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { anime } from '../../interfaces/anime';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() details:anime;
  @Output() closeDeets= new EventEmitter<void>();
  episodes:number[]=[];
  showAbout:boolean=true;
  showEpisodes:boolean=false;
  movie:boolean=false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    if(this.details.totalepisode=="1"){
      this.movie=true;
    } else {
      this.episodes=[];
      for(let i=parseInt(this.details.totalepisode);i>=1;i--)
        this.episodes.push(i);
    }
  }

  watch(ep:string) {
    sessionStorage.setItem('last', this.router.url);
    this.router.navigate(['watch/',this.details.id,ep]);
  }

  ClickOutside() {
    this.closeDeets.emit();
  }

  routeGenre(genre:string) {
    this.router.navigate(['/tileView',genre,"1"]);
  }
}
