import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Anime_data, Data_pack } from '../interfaces/anime';
import { BkndService } from './../bknd.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  popularList: Anime_data[] = [];
  recentList: Anime_data[] = [];
  deet: Anime_data;
  video: HTMLVideoElement;
  @ViewChild('video') videoPlayer: ElementRef;
  id = '';
  ep = '';
  src = '';
  title = '';
  time = 0;
  show_deets = false;
  src_null = true;

  constructor(
    private bknd: BkndService,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    sessionStorage.clear();
    if (this.cookie.check('src')) {
      this.id = this.cookie.get('id');
      this.ep = this.cookie.get('ep');
      this.title = this.cookie.get('title');
      this.time = parseInt(this.cookie.get('time'));
      this.src = this.cookie.get('src');
      this.src_null = false;
    }

    this.bknd.getPopular(1).subscribe((data: Data_pack) => {
      this.popularList = data.data;
    });

    this.bknd.getRecents(1).subscribe((data: Data_pack) => {
      this.recentList = data.data;
    });
  }

  ngAfterViewInit(): void {
    if (!this.src_null) {
      this.video = this.videoPlayer.nativeElement;
      this.video.currentTime = this.time;
      this.video.volume = 0.7;
      this.time = this.time + 30;

      this.video.addEventListener('timeupdate', () => {
        if (this.video.currentTime >= this.time) {
          this.video.pause();
          $('.title').addClass('big');
          $('.page').addClass('shade');
        }
      });
    }
  }

  contWatch() {
    sessionStorage.setItem('last', this.router.url);
    this.router.navigate(['watch/', this.id, this.ep]);
  }

  muteVid() {
    if (this.video.volume == 0) {
      this.video.volume = 0.7;
      $('.volume').removeClass('mute');
      $('.volume').addClass('volume_normal');
    } else {
      this.video.volume = 0;
      $('.volume').removeClass('volume_normal');
      $('.volume').addClass('mute');
    }
  }

  clickTile(an: Anime_data) {
    // if (an.episodenumber != null) {
    sessionStorage.setItem('last', this.router.url);
    this.router.navigate(['watch/', an.mal_id, an.episodes]);
    // } else {
    //   this.bknd.getDetails(an.id).subscribe((data) => {
    //     this.deet = Object.assign(new anime(), data['results'][0]);
    //     this.deet.id = an.id;
    //     this.show_deets = true;
    //   });
    // }
  }

  closeDeets() {
    this.show_deets = false;
  }
}
