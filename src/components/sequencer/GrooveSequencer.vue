<template>
  <div>
    <div style="display: flex">
      <DrumPlayer
        :audio-events="activeCells"
        v-model:bpm="bpm"
        @playStart="handlePlayStart"
        @playEnd="handlePlayEnd"
      ></DrumPlayer>
      <BasicButton
        style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0"
        @click="increaseView"
        class="p-button-icon"
        icon="pi pi-plus"
      ></BasicButton>
      <BasicButton
        style="width: 20%; margin: 0.5rem 0.25rem 0.5rem 0"
        @click="decreaseView"
        class="p-button-icon"
        icon="pi pi-minus"
      ></BasicButton>
    </div>

    <div class="sequencer-layout">
      <div class="sequencer-panel" style="width: 20%">
        <GrooveSequencerTrackPanel
          v-for="track in dummyTrackArray"
          v-model:mute="track.mute"
          v-model:solo="track.solo"
          v-model:grid="track.grid"
          :label="track.instrument"
          :key="track.id"
          style="margin: 1rem 0.25rem 1rem 0.25rem"
        ></GrooveSequencerTrackPanel>
      </div>
      <div style="position: relative">
        <div
          ref="carrot"
          style="
            height: 100%;
            position: absolute;
            width: 3px;
            background-color: darkred;
            z-index: 4;
          "
        ></div>
      </div>
      <div ref="scrollarea" class="multi-track-area" style="width: 80%">
        <GrooveSequencerTrack
          @cell-select="handleCellSelect"
          v-for="track in dummyTrackArray"
          :key="track.id"
          :track-id="track.id"
          :grid="track.grid"
          :instrument="track.instrument"
          style="margin: 1rem 1rem 1rem 0"
          :scale="scale"
        ></GrooveSequencerTrack>
      </div>
    </div>
  </div>
</template>

<script>
import GrooveSequencerTrack from "@/components/sequencer/GrooveSequencerTrack.vue";
import { ApplicationConfig } from "@/ApplicationConfig";
import GrooveSequencerTrackPanel from "@/components/sequencer/GrooveSequencerTrackPanel.vue";
import DrumPlayer from "@/components/player/DrumPlayer.vue";
// import DrPlayer from "@/components/player/DrPlayer";
// import DrumPlayer from "@/components/player/DrPlayer";
// import DrumPlayer from "@/components/player/DrumPlayer.vue";

export default {
  name: "GrooveSequencer",

  components: { DrumPlayer, GrooveSequencerTrackPanel, GrooveSequencerTrack },
  data() {
    return {
      dummyTrackArray: [
        {
          id: 1,
          solo: false,
          mute: false,
          grid: ApplicationConfig.signatures[3].value ,//quaternote/beat length
          instrument: ApplicationConfig.drums.HIHAT,
        },
        {
          id: 2,
          solo: false,
          mute: false,
          grid:  ApplicationConfig.signatures[3].value,
          instrument: ApplicationConfig.drums.SNDRM,
        },
        {
          id: 3,
          solo: false,
          mute: false,
          grid: ApplicationConfig.signatures[3].value,
          instrument: ApplicationConfig.drums.BSDRM,
        },
      ],
      activeCells: [],
      carrotX: 0,
      bpm: 60,
      carrotInterval: null,
      scale:500,
    };
  },
  computed: {
    carrotElement() {
      if (this.$refs.carrot) {
        return this.$refs.carrot;
      } else {
        return null;
      }
    },
  },

  methods: {
    increaseView(){
      this.scale *=1.10
    },
    decreaseView(){
      this.scale *=0.9
    },
    animateCarrot() {
      clearInterval(this.carrotInterval);
      this.carrotInterval = setInterval(() => {
        // console.log('animate',this.$refs.carrot.style)
        this.carrotX += 2.5 * (this.bpm / 60) * ((this.scale)/500);
        this.carrotElement.style.left =
          this.carrotX - this.$refs.scrollarea.scrollLeft + "px";
      }, 20);
    },
    handlePlayEnd(evt) {
      clearInterval(this.carrotInterval);
      this.carrotX = evt.maxLength;
      console.log("PlayEnd");
      // DrPlayer.stopPiece()
    },
    handlePlayStart() {
      // DrPlayer.playPiece(this.activeCells,this.bpm)
      this.carrotX = 0;
      this.animateCarrot();
      console.log("PlayStart");
    },
    // replayGroove(){
    //   DrPlayer.replay(this.activeCells,this.bpm)
    // },

    formatUUID(trackId, cellId) {
      return trackId.toString() + cellId.toString();
    },
    handleCellSelect(cell) {
      console.log("Received cell in component above: ", cell);
      if (cell) {
        this.activeCells = this.activeCells.filter((actCell) => {
          return (
              this.formatUUID(actCell.trackId, actCell.id) !==
              this.formatUUID(cell.trackId, cell.id)
          );
        });
        if (cell.active) {
          this.activeCells.push(cell);
        }
      } else {
        console.log("handleCellSelect: handleCellSelect: Cell undefined", cell);
      }
      console.log(
        "handleCellSelect: handleCellSelect: activeCells[] = ",
        this.activeCells
      );
    },

    handleScroll() {
      this.carrotElement.style.left =
        this.carrotX - this.$refs.scrollarea.scrollLeft + "px";
      // this.carrotX -= this.carrotX > 0 ? this.$refs.scrollarea.scrollLeft : 0
    },
  },
  mounted() {
    this.$refs.scrollarea.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    this.$refs.scrollarea.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.sequencer-layout {
  display: flex;
  background-color: #efefef;
}
.multi-track-area {
  max-width: 100%;
  overflow-x: scroll;
}
.sequencer-panel {
  z-index: 10;
}
</style>