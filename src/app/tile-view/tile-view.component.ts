import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BkndService } from './../bknd.service';
import { anime } from './../interfaces/anime';

@Component({
  selector: 'app-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.css']
})
export class TileViewComponent implements OnInit {

  constructor(private bknd: BkndService, private route: ActivatedRoute, private router: Router) { }

  animeList:anime[]=[];
  deet:anime;
  show_deets:boolean=false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id:string = params['id'];
      this.animeList=null;
      this.show_deets=false;
      switch(id) {
          case "popular": {
            this.popular();
            break;
          }
          case "recents": {
            this.recents(); 
            break;
          }
          case "search": {
            this.route.queryParams.subscribe(data => {
              this.search(data['term']);
            });
            break;
          }
          default: {
            this.genre(id);
          }
        }
    });
  }

  clickTile(an: anime) {
    if(an.episodenumber!=null) {
      this.router.navigate(['watch/',an.id,an.episodenumber]);
    } else {
      this.bknd.getDetails(an.id).subscribe(data=> {
        this.deet=Object.assign(new anime(),data["results"][0]);
        this.deet.id=an.id;
        this.show_deets=true;
      });
    }
  }

  closeDeets() {
    this.show_deets=false;
  }

  popular() {
    this.bknd.getPopular().subscribe(data=> {
      this.listData(data);
    });
  }

  recents() {
    this.bknd.getRecents().subscribe(data=> {
      this.listData(data);
    });
  }

  genre(genre:string) {
    this.bknd.getGenre(genre).subscribe(data=> {
      this.listData(data);
    });
  }

  search(term: string) {
    this.bknd.getSearch(term).subscribe(data=> {
      this.listData(data);
    });
  }

  listData(data) {
    this.animeList=[];
    for (let d in data["results"]){
      let a = Object.assign(new anime(),data["results"][d]);
      this.animeList.push(a);
    }
  }
}
