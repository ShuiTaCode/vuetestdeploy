import _ from "lodash";

import { PlayerConfiguration } from "@/components/player/PlayerConfiguration";

import { EventEmitter } from "events";

export default class DrumPlayer {
  constructor() {
    this.eventEmitterDelegate = new EventEmitter();
    this.dummyTimeConstant = 4000; //
    this.drumPiece = [];
    this.maxLength = 0;
    this.playAbleTracks = [];
    this.stop = false;
    this.repeatInterval = null;
    this.timeOutInterval = null;
  }

  emit(name, data) {
    this.eventEmitterDelegate.emit(name, data);
  }



  setTempo(tempo) {
    this.dummyTimeConstant = 4000 * (60 / tempo); //
  }

  setDrumPiece(drumPiece) {
    this.drumPiece = drumPiece;
    this.maxLength = _.max(
      this.drumPiece.map((event) => {
        // console.log(event.start + event.grid)
        return event.start + event.grid;
      })
    );
  }

  loadPiece(drumPiece) {
    this.setDrumPiece(drumPiece);
    this.setPlayAbleTracks(drumPiece);
    console.log({ playAbleTracks: this.playAbleTracks });
  }

  setPlayAbleTracks(drumPiece) {
    const groupedTracks = _.groupBy(drumPiece, "instrument");
    const newTracks = [];
    for (const instrument in groupedTracks) {
      newTracks.push(this.createPlayAbleTrack(groupedTracks[instrument], instrument)
      );
    }
    this.playAbleTracks = newTracks;
  }

  stopPiece() {
    this.clearAllIntervals(); //TODO pause und stop unterscheiden
    this.emit("end", { maxLength: this.maxLength });
    this.emit("stop");
    this.stop = true;
  }

  setEndTimeOut() {
    this.timeOutInterval = setTimeout(() => {
      if(this.stop===false){
        this.emit("end", { maxLength: this.maxLength });
      }
    }, this.maxLength * this.dummyTimeConstant);
  }

  prePareAndPlayPiece(drumPiece, tempo) {
    console.log("prePareAndPlayPiece",drumPiece)
    this.preparePiece(drumPiece, tempo);
    this.setEndTimeOut();
    this.playPiece();
  }

  preparePiece(drumPiece, tempo) {
    this.loadPiece(drumPiece);
    this.setTempo(tempo);
  }

  playPiece() {
    if (this.playAbleTracks && this.playAbleTracks.length > 0) {
      this.emit("playing");
      this.play();
    } else {
      console.log(
        "DrumPlayer: playPiece: Nothing to Play for piece: ",
        this.drumPiece
      );
    }
  }

  clearAllIntervals() {
    clearInterval(this.repeatInterval);
    clearInterval(this.timeOutInterval);
    this.repeatInterval=null;
    this.timeOutInterval=null;

  }
  setReplayTimeOut(drumPiece, tempo) {
    this.repeatInterval = setInterval(() => {
      this.emit("end", { maxLength: this.maxLength });
      this.preparePiece(drumPiece, tempo);
      this.playPiece();
    }, this.maxLength * this.dummyTimeConstant);
  }
  replay(drumPiece, tempo) {

    if (drumPiece && drumPiece.length > 0) {
      console.log("replay",{drumPiece})
      this.prePareAndPlayPiece(drumPiece, tempo);
      this.setReplayTimeOut(drumPiece, tempo);
    }
  }

  play() {
    this.stop = false;
    for (const track of this.playAbleTracks) {
      track.play();
    }
  }

  createPlayAbleTrack(events, instrument) {
    const audio = PlayerConfiguration.instruments[instrument];
    if (audio) {
      return {
        play: () => {
          for (const event of events) {
            setTimeout(() => {
              if (!this.stop) {
                audio.audio.currentTime = 0;
                audio.audio.volume = audio.volume;
                audio.audio.play();
              }
            }, event.start * this.dummyTimeConstant);
          }
        },
      };
    } else {
      console.log(
        "DrumPlayer: createPlayAbleTrack: Could not find audio from Instrument: ",
        instrument
      );
    }
  }
}
