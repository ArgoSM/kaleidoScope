import { Component, OnInit, Input } from '@angular/core';
import { Anime_data } from 'src/app/interfaces/anime';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
})
export class TileComponent implements OnInit {
  @Input() tileData: Anime_data;
  ep: boolean = false;
  constructor() {}

  ngOnInit(): void {
    // this.ep = this.tileData.episodenumber != null ? true : false;
  }
}
