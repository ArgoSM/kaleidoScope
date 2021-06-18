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
  id:string="";
  term:string="";
  show_deets:boolean=false;
  show_prev=false;
  show_next=false;
  page: number=1;
  no_content=false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params['id'];
      this.page=parseInt(params['page']);
      switch(this.id) {
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
              this.term=data['term'];
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

  clickTile(an: anime) {
    if(an.episodenumber!=null) {
      sessionStorage.setItem('last', this.router.url);
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
    this.bknd.getPopular(this.page.toString()).subscribe(data=> {
      this.listData(data);
    });
  }

  recents() {
    this.bknd.getRecents(this.page.toString()).subscribe(data=> {
      this.listData(data);
    });
  }

  genre(genre:string) {
    this.bknd.getGenre(genre,this.page.toString()).subscribe(data=> {
      this.listData(data);
    });
  }

  search(term: string) {
    this.bknd.getSearch(term, this.page.toString()).subscribe(data=> {
      this.listData(data);
    });
  }

  listData(data) {
    if(this.page>1) 
      this.show_prev=true;
    this.animeList=null;
    this.show_prev=false;
    this.show_deets=false;
    this.show_next=false;
    this.no_content=false;
    this.animeList=[];
    for (let d in data["results"]){
      let a = Object.assign(new anime(),data["results"][d]);
      this.animeList.push(a);
    }
    if(this.animeList.length==20)
      this.show_next=true;

    if(this.animeList.length==0)
      this.no_content=true;
  }

  pager(n) {
    if(this.id=="search")
      this.router.navigate(['/tileView',"search",n], { queryParams: { term: this.term }});
    else
      this.router.navigate(['/tileView',this.id,n]);
  }
}
