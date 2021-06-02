import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { anime } from '../interfaces/anime';
import { BkndService } from './../bknd.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  popularList:anime[]=[];
  recentList:anime[]=[];
  deet:anime;
  video: HTMLVideoElement;
  @ViewChild('video') videoPlayer: ElementRef;
  id="";
  src="";
  time="0";
  show_deets=false;
  src_null=true;

  constructor(private bknd: BkndService, private cookie: CookieService, private router: Router) { }

  ngOnInit() {
    if(this.cookie.check('src')) {
      this.id=this.cookie.get('id');
      this.time=this.cookie.get('time');
      this.src=this.cookie.get('src');
      this.src_null=false;
    }

    this.bknd.getPopular("1").subscribe(data=> {
      this.popularList=[];
      for (let d in data["results"]){
        let a = Object.assign(new anime(),data["results"][d]);
        this.popularList.push(a);
      }
    });
    
    this.bknd.getRecents("1").subscribe(data=> {
      this.recentList=[];
      for (let d in data["results"]){
        let a = Object.assign(new anime(),data["results"][d]);
        this.recentList.push(a);
      }
    });
  }

  ngAfterViewInit(): void {
    if(!this.src_null){
      this.video=this.videoPlayer.nativeElement;
      this.video.currentTime=parseInt(this.time);
      this.video.volume=0.7;
    }
  }

  contWatch() {
    this.router.navigate(['watch/',this.cookie.get('id'),this.cookie.get('ep')]);
  }

  muteVid() {
    if(this.video.volume==0)
      this.video.volume=0.7;
    else
      this.video.volume=0;
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
}
