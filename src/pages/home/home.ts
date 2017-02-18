import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';

import {SpotifyService} from "../../providers/spotify.service";
import {TrackPage} from "../track/track";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tracks: any[];
  loader: any;

  constructor(public navCtrl: NavController,
              private spotify: SpotifyService,
              private loadingCtrl: LoadingController) {
  }

  search(query) {
    this.loader = this.loadingCtrl.create();
    this.loader.present();

    this.spotify.searchTracks(query, 5)
      .subscribe(
        (res: any) => {
          this.tracks = res.tracks.items;
          this.loader.dismiss();
          console.log(this.tracks);
        },
        (err) => {
          this.loader.dismiss();
          alert(err);
        });
  }

  showMore(track) {
    this.navCtrl.push(TrackPage, {
      track: track
    });
  }

  ngOnInit() {
  }
}
