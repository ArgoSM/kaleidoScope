import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { anime } from '../interfaces/anime';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, AfterViewInit {

  playSpeed:number[]=[0.5,0.75,1.0,1.5,2.0];
  srcMap:any;
  deet: anime;
  src:string="";
  isFull: boolean = false;
  ep:string="";
  elem:any;
  lastVol: number=100;
  timeLeft: string="";
  idleTimer = null;
  idleState = false;
  loading = true;
  video: HTMLVideoElement;
  time: HTMLInputElement;
  vol: HTMLInputElement;
  overlay: HTMLDivElement;
  @ViewChild('overLay') overLay: ElementRef;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('timeMark') timeMark: ElementRef;
  @ViewChild('volumeControl') volumeControl: ElementRef;

  constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document: any, private router: Router, private cookie: CookieService) {}

  ngOnInit(): void {
    this.route.data.subscribe(data=> {
      this.srcMap=new Map<string,string>();
      this.deet=Object.assign(new anime(),data["detail"]["results"][0]);
      this.route.params.subscribe(params => {
        this.ep=params["ep"];
        this.deet.id=params["id"];
      });
      this.src=data["watch"]["links"][0]["src"];
      for (let d in data["watch"]["links"])
        this.srcMap.set(data["watch"]["links"][d]["size"], data["watch"]["links"][d]["src"]);
    });
  }
  
  ngAfterViewInit(): void {
    this.video=this.videoPlayer.nativeElement;
    this.time=this.timeMark.nativeElement;
    this.vol=this.volumeControl.nativeElement;
    this.elem=document.documentElement;
    this.overlay=this.overLay.nativeElement;

    this.showFoo();
    this.loading=false;

    this.keyboardListen();
    $(window).mousemove(()=>{this.showFoo();});

    if(this.cookie.check('time')){
      if(this.cookie.get('id')==this.deet.id && this.cookie.get('ep')==this.ep){
        this.video.currentTime=parseInt(this.cookie.get('time'));
      }
    }
    this.cookie.deleteAll();
    this.cookie.set('id',this.deet.id);
    this.cookie.set('ep',this.ep);
    this.cookie.set('src',this.src);
    this.cookie.set('title',this.deet.title);

    this.video.addEventListener('timeupdate', ()=> {
      if(!this.loading){
        let timePos = this.video.currentTime / this.video.duration;
        this.time.value = (timePos*100).toString();
        this.timeUpdate();
        this.time.style.background = 'linear-gradient(to right, #F15156 0%, #F15156 ' + this.time.value + '%, rgba(0, 0, 0, 0.7) ' + this.time.value + '%, rgba(0, 0, 0, 0.7) 100%)'
        this.cookie.set('time',this.video.currentTime.toString());
    }});

    this.video.addEventListener('waiting', ()=>{this.loading=true;});
    this.video.addEventListener('seeking', ()=> {this.loading=true;});
    this.video.addEventListener('loadeddata',()=>{this.loading=false;});
    this.video.addEventListener('seeked', ()=>{this.loading=false;});

    this.vol.addEventListener('input', ()=>{
      this.video.volume = Number(this.vol.value)/100;
      this.lastVol=this.video.volume;
      this.volUpdate();
    })

    this.time.addEventListener('input',()=> {
      let timePos = this.video.duration * (Number(this.time.value)/100);
      this.video.currentTime=timePos;
    })
  }

  keyboardListen() {
    window.addEventListener('keydown',(e)=> {
      switch(e.which) {
        case 70: {
          this.onFullscreen();
          break;
        }
        case 77: {
          this.onMute();
          break;
        }
        case 32: {
          this.playClick();
          break;
        }
        case 39: {
          this.skip(10);
          break;
        }
        case 37: {
          this.skip(-10);
          break;
        }
      }
    });
  }

  playClick(){
    if(this.video.paused){
      $(".play_pause").removeClass("play");
      $(".play_pause").addClass("pause");
      this.video.play();
      this.showFoo();
    } else {
      $(".play_pause").removeClass("pause");
      $(".play_pause").addClass("play");
      this.video.pause();
      this.showFoo();
    }
  }

  onFullscreen() {
    if(!this.isFull){
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        this.elem.msRequestFullscreen();
      }
      $(".fullscreen").removeClass("full");
      $(".fullscreen").addClass("small");
      this.isFull=true;
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        this.document.msExitFullscreen();
      }
      $(".fullscreen").removeClass("small");
      $(".fullscreen").addClass("full");
      this.isFull=false;
    }
  }

  goBack() {
    console.log(sessionStorage.getItem('last'));
    this.router.navigate([sessionStorage.getItem('last')]);
  }

  volUpdate() {
    this.vol.style.background = 'linear-gradient( to right, #F15156 0%, #F15156 ' + this.vol.value + '%, rgba(0, 0, 0, 0.7) ' + this.vol.value + '%, rgba(0, 0, 0, 0.7) 100%)'
    if(this.video.volume==0){
      $(".volume").removeClass("volume_normal");
      $(".volume").addClass("mute");
    }
    else {
      $(".volume").removeClass("mute");
      $(".volume").addClass("volume_normal");
    }
  }

  timeUpdate() {
    let seconds = this.video.duration - this.video.currentTime;
    let h=11,s=8;
    if (1>seconds/3600) { h=14; s=5 }
    this.timeLeft=new Date(seconds * 1000).toISOString().substr(h,s);
  }

  onMute() {
    if(this.video.volume==0) { 
      this.video.volume=this.lastVol;
    } else {
      this.lastVol=this.video.volume;
      this.video.volume=0;
    }
    this.vol.value=(this.video.volume * 100).toString();
    this.volUpdate();
  }

  showFoo() {
    clearTimeout(this.idleTimer);
    if (this.idleState == true) {
      $(".overlay").removeClass("inactive");
    }
    this.idleState = false;
    this.idleTimer = setTimeout( ()=> {
      if (!this.video.paused) {
      $(".overlay").addClass("inactive");
      this.idleState = true;
    }}, 3000);
  }

  speedChange(speed:number) {
    this.video.playbackRate=speed;
  }

  qualityChange(key:string) {
    this.loading=true;
    this.video.style.opacity='0';
    let lastTime=this.video.currentTime;
    this.src=this.srcMap.get(key);
    this.video.addEventListener('loadedmetadata', ()=> {
      this.video.style.opacity='1';
      this.video.currentTime=lastTime;
      this.video.addEventListener('seeked', ()=> {
        this.video.play();
        this.loading=false;
      });
    });
  }

  srcKeys() {
    return Array.from(this.srcMap.keys());
  }

  skip(t:number) {
    let skippedTime=this.video.currentTime+t;
    if(skippedTime>=0 && skippedTime<=this.video.duration)
      this.video.currentTime=skippedTime;
  }
}
